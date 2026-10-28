import React, { useState, useMemo, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, parseISO, isToday, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faClock} from '@fortawesome/free-solid-svg-icons';
import { listarCitas } from '../../../api/calendar'
// 1. Agregamos la prop "mode" (puede ser 'view', 'edit' o undefined para normal)
export function Calendar({ reservaData,setReservaData, onNext, onBack, mode = 'edit' }) {
 const[reservaciones, setReservaciones] = useState({});
  useEffect(() => {
  listarCitas()
    .then((response) => {      
      
      setReservaciones(response.data.reservaciones);      
    })
    .catch((error) => {
      console.error("Hubo un error al obtener las citas:", error);
    })
    .finally(() => {
      setIsSaving(false);
    });
}, []);  
  const [isSaving, setIsSaving] = useState(false)
 
  // Claves de lectura semánticas para limpieza del código
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const hiddenButtonMode = mode === 'hiddenButton';

  const fechasSeleccionadas = useMemo(() => {
  if (mode !== "hiddenButton") {
    return generarCalendarioEstados(10, reservaciones);
  } else {
    return generarCalendarioReservaciones(reservaciones);
  }
}, [mode, reservaciones]);
  

  const datosAgenda = fechasSeleccionadas;

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    reservaData.fecha ? parseISO(reservaData.fecha) : undefined
  )

  const [horaSeleccionada, setHoraSeleccionada] = useState(reservaData.hora || '')

  const fechaStringSeleccionada = fechaSeleccionada ? format(fechaSeleccionada, 'yyyy-MM-dd') : '';
  const infoDiaSeleccionado = datosAgenda[fechaStringSeleccionada];
  const esDiaDisponible = infoDiaSeleccionado && (
    hiddenButtonMode 
      ? infoDiaSeleccionado.estado === 'reservado' 
      : infoDiaSeleccionado.estado === 'disponible'
  ); 
  const horariosBase = esDiaDisponible ? infoDiaSeleccionado.horarios : [];
  const horariosHabilitados = fechasSeleccionadas[fechaStringSeleccionada]?.horarios || [];// filtrarHorariosPorHoraActual(horariosBase, fechaSeleccionada);// Enviar horarios habiles 
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
                if (isViewMode && !hiddenButtonMode) return; 
                setFechaSeleccionada(day);
                setHoraSeleccionada('');

                if (setReservaData) {
                  setReservaData({
                    pacienteId: '',
                    nuevoPaciente: null,
                    medicoId: '',           
                    medicoNombre: '',       
                    medicoEspecialidad: '',
                    fecha: day ? format(day, 'yyyy-MM-dd') : '',          
                    hora: '',           
                    motivo: ''          
                  });
                }
              }}
              locale={es}
              
              // 🔒 CONTROL DE BLOQUEO: Deshabilita si es modo consulta, si es fin de semana, 
              // o si el día NO tiene el estado 'disponible' en tu objeto de negocio.
              disabled={
                isViewMode
                ? [() => true] // Si es modo consulta pura, bloquea absolutamente todo
                : [
                    { dayOfWeek: [0] }, // Sábados y Domingos deshabilitados siempre
                    (date) => {
                      const fechaStr = format(date, 'yyyy-MM-dd');
                      const infoDia = datosAgenda[fechaStr];

                      // 1. Si el día ni siquiera existe en los datos de la agenda, se bloquea
                      if (!infoDia) return true;

                      // 2. Si el modo es 'hiddenButton', permitimos ver los días con estado 'reservado'
                      if (mode === "hiddenButton") {
                        return infoDia.estado !== 'reservado';
                      }

                      // 3. Para cualquier otro modo, se mantiene la regla original de 'disponible'
                      return infoDia.estado !== 'disponible';
                    }
                  ]
              }
              
              classNames={{
                months: 'relative flex flex-col sm:flex-row gap-4 w-full justify-center',
                month: 'space-y-5 w-full max-w-[330px]',
                month_caption: 'flex justify-between items-center h-10 px-1 relative mb-2',
                caption_label: 'text-sm font-bold text-gray-800 uppercase tracking-widest',
                nav: `absolute right-1 top-2 flex items-center gap-1.5 z-10 ${isViewMode && mode !== "hiddenButton" ? 'hidden' : ''}`,
                button_previous: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
                button_next: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
                month_grid: 'w-full border-collapse',
                weekdays: 'grid grid-cols-7 gap-1 text-center mb-3',
                weekday: 'text-gray-400 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center h-8',
                week: 'grid grid-cols-7 gap-1 text-center mt-1',
                day: `h-9 w-9 mx-auto font-semibold text-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 relative text-sm ${isViewMode && mode !== "hiddenButton" ? 'cursor-default' : 'hover:bg-fuchsia-50 hover:text-fuchsia-900 cursor-pointer'}`,
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
                      {!isViewMode && hiddenButtonMode && infoDia && infoDia.estado !== 'completo' && (
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
      {(fechaSeleccionada && !isViewMode ) && (
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
            disabled={hiddenButtonMode}
            onClick={() => {
              // 1. Siempre marcamos la hora seleccionada visualmente
              setHoraSeleccionada(hora);

              // 2. Si estamos consultando citas existentes, buscamos los datos reales
              if (hiddenButtonMode) {
                const fechaStr = format(fechaSeleccionada, 'yyyy-MM-dd');
                const citasDelDia = (reservaciones[fechaStr] || []).flat();
                
                const citaReal = citasDelDia.find(cita => {
                  const horaCita = typeof cita === 'string' ? cita : (cita.hora || '');
                  return horaCita.trim().substring(0, 5) === hora;
                });

                if (citaReal  && setReservaData) {
                  // Actualizamos el estado para que la tarjeta de abajo pinte los datos reales
                  setReservaData(citaReal);
                }
              } else {
                // Modo edición normal: solo guardamos la hora en el formulario
                if (setReservaData) {
                  setReservaData(prev => ({ ...prev, hora }));
                }
              }
            }}
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
        (!isViewMode || hiddenButtonMode) && (
          <p className="text-xs text-gray-400 italic text-center">
            {hiddenButtonMode 
              ? "Selecciona un día del calendario para ver las horas con citas reservadas."
              : "Selecciona un día marcado en verde para ver los horarios disponibles."
            }
          </p>
        )
      )}
    </div>


      {/* 3. BOTONES DE ACCIÓN / NAVEGACIÓN INFERIOR */}
      {/* BOTONES DE ACCIÓN */}
      {!hiddenButtonMode && (
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
      )}
      

    </form>
  )
}

function generarCalendarioEstados(mesesFuturos, reservadosRaw) {
  const reservados = {};
    Object.keys(reservadosRaw).forEach(key => {
        reservados[key.trim()] = reservadosRaw[key];
    });
    const horariosRaw = import.meta.env.VITE_HORARIOS || "";
    const horariosBase = horariosRaw.split(",").map(horario => horario.trim());
    const calendario = {};
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth();

    const yyyyHoy = hoy.getFullYear();
    const mmHoy = String(mesActual + 1).padStart(2, '0');
    const ddHoy = String(hoy.getDate()).padStart(2, '0');
    const hoyStr = `${yyyyHoy}-${mmHoy}-${ddHoy}`;
    
    const fechaActual = new Date(anioActual, mesActual, hoy.getDate(), 12, 0, 0);
    const finMesActual = new Date(anioActual, mesActual + 1, 0, 12, 0, 0);
    const inicioMesActual = new Date(anioActual, mesActual,1,12,0,0);
    const finCalendario = new Date(anioActual, mesActual + mesesFuturos + 1, 0, 12, 0, 0);

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
        /* else {
            estado = 'por-abrir';
            etiqueta = 'Próximamente';
        } */

         if (estado) {
          const minutosActuales = (hoy.getHours() * 60) + hoy.getMinutes();
        // 1. Obtener las horas ya ocupadas para este día (si no hay, usamos un array vacío)
        const horasOcupadasRaw = (reservados[fechaStr] || []).flat();        
        const horasOcupadas = horasOcupadasRaw.map(hora => {
          if (typeof hora === 'string') {
            return hora.trim().substring(0, 5); // Transforma "19:00:00" o "19:00:00 " en "19:00"
          }
          return hora;
        }
        );

        if (horasOcupadas.length > 0) {
          console.log(`Cruce para el día ${fechaStr}:`, { Reservadas: horasOcupadas, Base: horariosBase });
        }
        // 2. Filtrar el horario base dejando solo los que NO estén en las horas ocupadas
        const horariosDisponibles = horariosBase.filter(horario => {
        // Regla A: Si la hora ya está reservada, se descarta
        const estaOcupado = horasOcupadas.includes(horario.trim());
        if (estaOcupado) return false;

        // Regla B: Si es el día de hoy, descartar turnos que ya pasaron de la hora actual
        if (fechaStr === hoyStr) {
          const minutosActuales = (hoy.getHours() * 60) + hoy.getMinutes();
          const [hora, minutos] = horario.split(':').map(Number);
          const minutosHorario = (hora * 60) + minutos;
          return minutosHorario > minutosActuales; 
        }
        return true; // Pasa el filtro si está libre y es un día futuro
        });
        // 3. Modificación dinámica de estado si ya se llenaron todos los cupos
        let estadoFinal = estado;
        let etiquetaFinal = etiqueta;
        
        if (estado === 'disponible' && horariosDisponibles.length === 0) {
          estadoFinal = 'completo';
          etiquetaFinal = 'Lleno';
        }

        calendario[fechaStr] = {
          estado: estadoFinal,
          etiqueta: etiquetaFinal,
          // Si está disponible, le asignamos las horas filtradas; si no, array vacío
          horarios: estadoFinal === 'disponible' ? horariosDisponibles : []

        };
      }
      
      fechaBucle.setDate(fechaBucle.getDate() + 1);
    }
    return calendario;
}

function generarCalendarioReservaciones(reservadosRaw) {
    const reservados = {};
    Object.keys(reservadosRaw).forEach(key => {
        reservados[key.trim()] = reservadosRaw[key];
    });

    const calendario = {};
    const hoy = new Date();
    const yyyyHoy = hoy.getFullYear();
    const mmHoy = String(hoy.getMonth() + 1).padStart(2, '0');
    const ddHoy = String(hoy.getDate()).padStart(2, '0');
    const hoyStr = `${yyyyHoy}-${mmHoy}-${ddHoy}`;

    // Recorremos únicamente los días que tienen reservaciones en el objeto `reservados`
    Object.keys(reservados).forEach(fechaStr => {
        const horasOcupadasRaw = (reservados[fechaStr] || []).flat();        
        
        // Extraer y formatear solo las horas reservadas
        const horariosReservados = horasOcupadasRaw
            .map(cita => {
                // Si tu estructura guarda objetos de cita enteros con una propiedad '.hora':
                // const hora = cita.hora; 
                // Si guarda directamente strings de horas, lo dejamos como lo tenías:
                const hora = typeof cita === 'string' ? cita : cita.hora; 
                
                if (typeof hora === 'string') {
                    return hora.trim().substring(0, 5); 
                }
                return null;
            })
            .filter(hora => hora !== null); // Limpiar nulos si los hay

        // Si este día tiene horarios reservados, lo agregamos al calendario
        if (horariosReservados.length > 0) {
            
            // Definir etiquetas básicas según si el día es pasado o futuro/hoy
            let estado = 'reservado';
            let etiqueta = 'Con Citas';

            if (fechaStr < hoyStr) {
                estado = 'historial';
                etiqueta = 'Finalizado';
            }

            calendario[fechaStr] = {
                estado: estado,
                etiqueta: etiqueta,
                // Asignamos únicamente los horarios que ya están ocupados
                horarios: horariosReservados 
            };
        }
    });
    console.log("RESERVACIONESSSSS",calendario);
    return calendario;
}



