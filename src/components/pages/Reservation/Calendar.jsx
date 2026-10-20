import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

// 1. Agregamos la prop "mode" (puede ser 'view', 'edit' o undefined para normal)
export function Calendar({ reservaData, onNext, onBack, mode = 'edit' }) {
  const [isSaving, setIsSaving] = useState(false)
  
  // Claves de lectura semánticas para limpieza del código
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const [datosAgenda] = useState({
    '2026-10-19': { estado: 'disponible', etiqueta: 'Abierto' },
    '2026-10-20': { estado: 'por-abrir', etiqueta: 'Por cerrar' },
    '2026-10-21': { estado: 'disponible', etiqueta: 'Abierto' },
    '2026-10-22': { estado: 'completo', etiqueta: 'Lleno' },
  })

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    reservaData.fecha ? parseISO(reservaData.fecha) : undefined
  )
  const [horaSeleccionada, setHoraSeleccionada] = useState(reservaData.hora || '')

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
          {isViewMode ? 'Día de la consulta' : '1. Selecciona el día de tu consulta'}
        </label>
        <div className='border border-gray-100 p-4 rounded-2xl shadow-sm bg-gray-50/50 w-full flex justify-center'>
          <DayPicker
            mode="single"
            selected={fechaSeleccionada}
            onSelect={(day) => {
              // ❌ BLOQUEO: Si es modo consulta, no se puede cambiar el día
              if (isViewMode) return; 
              setFechaSeleccionada(day)
              setHoraSeleccionada('')
            }}
            locale={es}
            // 🔒 Si es modo consulta, deshabilitamos todos los demás días del mes
            disabled={isViewMode ? [() => true] : [statusMatcher, { dayOfWeek: [0, 6] }]}
            classNames={{
              months: 'relative flex flex-col sm:flex-row gap-4 w-full justify-center',
              month: 'space-y-5 w-full max-w-[330px]',
              month_caption: 'flex justify-between items-center h-10 px-1 relative mb-2',
              caption_label: 'text-sm font-bold text-gray-800 uppercase tracking-widest',
              
              // 🔒 CONTROL DE NAVEGACIÓN: Si es modo consulta, ocultamos las flechas de cambio de mes
              nav: `absolute right-1 top-2 flex items-center gap-1.5 z-10 ${isViewMode ? 'hidden' : ''}`,
              button_previous: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
              button_next: 'h-8 w-8 bg-white border border-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:text-fuchsia-900 shadow-sm transition-all duration-200 cursor-pointer',
              
              month_grid: 'w-full border-collapse',
              weekdays: 'grid grid-cols-7 gap-1 text-center mb-3',
              weekday: 'text-gray-400 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center h-8',
              week: 'grid grid-cols-7 gap-1 text-center mt-1',
              
              // Modificación sutil si es modo lectura para quitar la manita (cursor-pointer)
              day: `h-9 w-9 mx-auto font-semibold text-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 relative text-sm ${isViewMode ? 'cursor-default' : 'hover:bg-fuchsia-50 hover:text-fuchsia-900 cursor-pointer'}`,
              selected: 'bg-fuchsia-900 text-white font-bold shadow-md shadow-fuchsia-900/30 hover:bg-fuchsia-900 hover:text-white rounded-xl scale-105',
              today: 'ring-2 ring-fuchsia-900/20 text-fuchsia-900 font-bold bg-fuchsia-50/30',
              disabled: isViewMode ? 'text-gray-400 opacity-40' : 'text-gray-300 opacity-30 line-through cursor-not-allowed hover:bg-transparent hover:text-gray-300',
              outside: 'text-gray-300 opacity-40 pointer-events-none',
            }}
            components={{
              DayButton: ({ day, ...props }) => {
                const fechaString = format(day.date, 'yyyy-MM-dd')
                const infoDia = datosAgenda[fechaString]
                return (
                  <button
                    {...props}
                    className={`${props.className} relative flex flex-col items-center justify-center pt-1 w-full h-full`}
                  >
                    <span>{day.date.getDate()}</span>
                    {/* Ocultamos los indicadores de colores en modo consulta si gustas */}
                    {!isViewMode && infoDia && infoDia.estado !== 'completo' && (
                      <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${infoDia.estado === 'disponible' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    )}
                  </button>
                )
              }
            }}
          />
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
      <div className='w-full flex flex-col gap-3 min-h-[100px]'>
        <label className='text-sm font-bold text-gray-700'>
          {isViewMode ? 'Hora de la cita' : '2. Elige una hora disponible para tu cita'}
        </label>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 w-full'>
          {/* En modo consulta, puedes renderizar solo la hora guardada, o renderizar los botones pero bloqueados */}
          {isViewMode ? (
            <div className='p-3 bg-fuchsia-900 text-white text-center font-bold rounded-xl text-sm max-w-xs shadow-sm'>
              ⏰ {horaSeleccionada || 'No asignada'}
            </div>
          ) : (
            // Modo Edición: Muestra todos los controles operacionales de selección
            ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM'].map((hora) => (
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
          )}
        </div>
      </div>

      {/* 3. BOTONES DE ACCIÓN / NAVEGACIÓN INFERIOR */}
      {/* Solo se muestran si estás editando o creando */}
      {isEditMode && (
        <div className='flex gap-4 w-full mt-4 border-t border-gray-100 pt-4'>
          {onBack && (
            <button 
              type="button" 
              onClick={onBack}
              className='px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer'
            >
              Regresar
            </button>
          )}
          <button 
            type="submit"
            disabled={isSaving || !fechaSeleccionada || !horaSeleccionada}
            className='flex-1 bg-fuchsia-900 text-white p-3 rounded-xl text-xs font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
          >
            {isSaving ? 'Guardando...' : 'Confirmar Cambios'}
          </button>
        </div>
      )}

    </form>
  )
}
