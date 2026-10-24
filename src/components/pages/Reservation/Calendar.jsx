import React, { useState, useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, parseISO, isToday, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faClock} from '@fortawesome/free-solid-svg-icons';

// 1. Agregamos la prop "mode" (puede ser 'view', 'edit' o undefined para normal)
export function Calendar({ reservaData, onNext, onBack, mode = 'edit' }) {
  const fechasSeleccionadas = useMemo(() => generarCalendarioEstados(10), []);
  const [isSaving, setIsSaving] = useState(false)
 
  // Claves de lectura semánticas para limpieza del código
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const [datosAgenda] = useState(fechasSeleccionadas)

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    reservaData.fecha ? parseISO(reservaData.fecha) : undefined
  )

  const [horaSeleccionada, setHoraSeleccionada] = useState(reservaData.hora || '')

    const fechaStringSeleccionada = fechaSeleccionada ? format(fechaSeleccionada, 'yyyy-MM-dd') : '';
    const infoDiaSeleccionado = datosAgenda[fechaStringSeleccionada];
    const esDiaDisponible = infoDiaSeleccionado?.estado === 'disponible';    

    const horariosBase = esDiaDisponible ? infoDiaSeleccionado.horarios : [];
    const horariosHabilitados = filtrarHorariosPorHoraActual(horariosBase, fechaSeleccionada);
  const statusMatcher = (day) => {
    const fechaString = format(day, 'yyyy-MM-dd')
    return datosAgenda[fechaString]?.estado === 'completo'
  }

  const handleContinuar = (e) => {
    e.preventDefault()
    if (!fechaSeleccionada || !horaSeleccionada || isViewMode) return

    setIsSaving(true)
    onNext({
      fecha: format(fechaSeleccionada, 'yyyy-MM-dd'),
      hora: horaSeleccionada
    })
  }

  return (
    <form onSubmit={handleContinuar} className='flex flex-col gap-6 w-full animate-fade-in'>
      
      {/* 1. EL CALENDARIO */}
      <div className='w-full flex flex-col items-center gap-2'>
        <label className='text-sm font-bold text-gray-700 self-start'>
          <FontAwesomeIcon icon={faCalendarDay}  /> {isViewMode ? 'Día de la consulta' : '1. Selecciona el día de tu consulta'}
        </label>
        <div className='border border-gray-100 p-4 rounded-2xl shadow-sm bg-gray-50/50 w-full flex justify-center'>
          <div className='border border-gray-100 p-4 rounded-2xl shadow-sm bg-gray-50/50 w-full flex justify-center'>
      <DayPicker
        mode="single"
        selected={fechaSeleccionada}
        onSelect={(day) => {
          if (isViewMode) return; 
          setFechaSeleccionada(day);
          setHoraSeleccionada('');
        }}
        locale={es}
        
        // 🔒 CONTROL DE BLOQUEO: Deshabilita si es modo consulta, si es fin de semana, 
        // o si el día NO tiene el estado 'disponible' en tu objeto de negocio.
        disabled={
          isViewMode 
            ? [() => true] 
            : [
                { dayOfWeek: [0, 6] }, // Sábados y Domingos deshabilitados
                (date) => {
                  const fechaStr = format(date, 'yyyy-MM-dd');
                  const infoDia = datosAgenda[fechaStr];
                  // Deshabilitar si el día no existe en la agenda o si su estado NO es 'disponible'
                  return !infoDia || infoDia.estado !== 'disponible';
                }
              ]
        }
        
        classNames={{
          months: 'relative flex flex-col sm:flex-row gap-4 w-full justify-center',
          month: 'space-y-5 w-full max-w-[330px]',
          month_caption: 'flex justify-between items-center h-10 px-1 relative mb-2',
          caption_label: 'text-sm font-bold text-gray-800 uppercase tracking-widest',
          nav: `absolute right-1 top-2 flex items-center gap-1.5 z-10 ${isViewMode ? 'hidden' : ''}`,
          button_previous: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
          button_next: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
          month_grid: 'w-full border-collapse',
          weekdays: 'grid grid-cols-7 gap-1 text-center mb-3',
          weekday: 'text-gray-400 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center h-8',
          week: 'grid grid-cols-7 gap-1 text-center mt-1',
          day: `h-9 w-9 mx-auto font-semibold text-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 relative text-sm ${isViewMode ? 'cursor-default' : 'hover:bg-fuchsia-50 hover:text-fuchsia-900 cursor-pointer'}`,
          selected: 'bg-fuchsia-900 text-white font-bold shadow-md shadow-fuchsia-900/30 hover:bg-fuchsia-900 hover:text-white rounded-xl scale-105',
          today: 'ring-2 ring-fuchsia-900/20 text-fuchsia-900 font-bold bg-fuchsia-50/30',
          disabled: isViewMode ? 'text-gray-400 opacity-40' : 'text-gray-300 opacity-30 line-through cursor-not-allowed hover:bg-transparent hover:text-gray-300',
          outside: 'text-gray-300 opacity-40 pointer-events-none',
        }}
        components={{
          DayButton: ({ day, ...props }) => {
            const fechaString = format(day.date, 'yyyy-MM-dd');
            const infoDia = datosAgenda[fechaString];
            return (
              <button
                {...props}
                className={`${props.className} relative flex flex-col items-center justify-center pt-1 w-full h-full`}
              >
                <span>{day.date.getDate()}</span>
                {!isViewMode && infoDia && infoDia.estado !== 'completo' && (
                  <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${infoDia.estado === 'disponible' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                )}
              </button>
            );
          }
        }}
      />
      </div>
        </div>
      </div>

      {/* Ocultar barra de referencias de colores en vista de consulta */}
      {!isViewMode && (
        <div className='w-full flex justify-center items-center gap-6 bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4'>
          {/* ... tus indicadores de disponible, por cerrar, lleno ... */}
        </div>
      )}

      {/* Indicador de Fecha elegante */}
      {fechaSeleccionada && (
        <div className='w-full bg-fuchsia-50/40 border border-fuchsia-100/50 rounded-xl px-4 py-3 flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-fuchsia-900 text-white flex items-center justify-center text-xs font-bold'>
            {format(fechaSeleccionada, 'd')}
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
              {isViewMode ? 'Fecha agendada' : 'Día seleccionado'}
            </span>
            <span className='text-sm font-bold text-fuchsia-900 capitalize'>
              {format(fechaSeleccionada, "EEEE, d 'de' MMMM", { locale: es })}
            </span>
          </div>
        </div>
      )}

      {/* 2. LOS BLOQUES DE HORARIOS */}
      {/* SECCIÓN DE HORARIOS: Solo renderiza si el día seleccionado está 'disponible' y tiene horas */}
    <div className="flex gap-2 flex-wrap p-2 justify-center">
      {esDiaDisponible && horariosHabilitados.length > 0 ? (
        horariosHabilitados.map((hora) => (
          <button
            type="button"
            key={hora}
            onClick={() => setHoraSeleccionada(hora)}
            className={`p-3 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer
              ${horaSeleccionada === hora 
                ? 'bg-fuchsia-900 text-white border-fuchsia-900 shadow-sm' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-fuchsia-200 hover:bg-fuchsia-50/30'
              }`}
          >
            {hora}
          </button>
        ))
      ) : (
        !isViewMode && (
          <p className="text-xs text-gray-400 italic">
            Selecciona un día marcado en verde para ver los horarios disponibles.
          </p>
        )
      )}
    </div>

      {/* 3. BOTONES DE ACCIÓN / NAVEGACIÓN INFERIOR */}
      {/* BOTONES DE ACCIÓN */}
      <div className='flex justify-between items-center mt-4 border-t border-gray-100 pt-4 w-full'>
        <button 
          type='button' 
          onClick={onBack} 
          className='text-sm font-bold text-gray-500 hover:text-gray-700 cursor-pointer transition-colors'
        >
          ← Atrás
        </button>
        <button
          type='submit'
          className="bg-linear-to-r from-fuchsia-900 to-fuchsia-900 text-white font-bold px-8 py-3 rounded-full text-sm shadow-xl shadow-fuchsia-900/20 hover:from-fuchsia-900 hover:to-fuchsia-900 transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          Revisar cita →
        </button>
      </div>

    </form>
  )
}

function generarCalendarioEstados(mesesFuturos = 6) {
    const calendario = {};
    const hoy = new Date();
    
    const fechaActual = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const finMesActual = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finCalendario = new Date(hoy.getFullYear(), hoy.getMonth() + 1 + mesesFuturos, 0);

    // Tus horarios base habilitados
    const horariosBase = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM'];

    let fechaBucle = new Date(inicioMesActual);
    
    while (fechaBucle <= finCalendario) {
        const yyyy = fechaBucle.getFullYear();
        const mm = String(fechaBucle.getMonth() + 1).padStart(2, '0');
        const dd = String(fechaBucle.getDate()).padStart(2, '0');
        const fechaStr = `${yyyy}-${mm}-${dd}`;

        let estado = '';
        let etiqueta = '';

        if (fechaBucle < fechaActual) {
            estado = 'completo';
            etiqueta = 'Cerrado';
        } 
        else if (fechaBucle >= fechaActual && fechaBucle <= finMesActual) {
            estado = 'disponible';
            etiqueta = 'Abierto';
        } 
        else if (fechaBucle.getMonth() === (hoy.getMonth() + 1) % 12 && fechaBucle.getFullYear() === hoy.getFullYear() + Math.floor((hoy.getMonth() + 1) / 12)) {
            if (fechaBucle.getDate() >= fechaActual.getDate()) {
                estado = 'por-abrir';
                etiqueta = 'Próximamente';
            }
            else {
              estado = 'disponible';
              etiqueta = 'Abierto';
            }
        }
        else {
            estado = 'por-abrir';
            etiqueta = 'Próximamente';
        }

        if (estado) {
            calendario[fechaStr] = { 
                estado, 
                etiqueta,
                // Si está disponible, le asignamos las horas; si no, array vacío
                horarios: estado === 'disponible' ? [...horariosBase] : [] 
            };
        }

        fechaBucle.setDate(fechaBucle.getDate() + 1);
    }

    return calendario;
}

const filtrarHorariosPorHoraActual = (horarios, fechaSeleccionada) => {
  // Si no hay fecha o no es el día de hoy, mostramos todos los horarios completos
  if (!fechaSeleccionada || !isToday(fechaSeleccionada)) {
    return horarios;
  }

  const ahora = new Date();

  return horarios.filter((horaStr) => {
    // Convertimos el string '09:00 AM' a un objeto Date usando la fecha de hoy
    const fechaHora = parse(horaStr, 'hh:mm a', ahora);
    
    // Solo dejamos las horas que sean posteriores o iguales al momento actual
    return fechaHora >= ahora;
  });
};
