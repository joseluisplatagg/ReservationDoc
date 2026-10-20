// src/components/reservar/StepResumen.jsx
import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ReservationConfirm({ reservaData, onBack }) {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Formateamos la fecha recolectada de forma elegante para el ticket
  const fechaFormateada = reservaData.fecha 
    ? format(parseISO(reservaData.fecha), "EEEE d 'de' MMMM, yyyy", { locale: es })
    : ''

  const handleConfirmarCita = async () => {
    setIsSaving(true)
    try {
      // 🚀 Aquí se realizaría la petición fetch/axios hacia tu backend de PostgreSQL
      // const response = await fetch('/api/citas', { method: 'POST', body: JSON.stringify(reservaData) })
      
      // Simulamos la respuesta exitosa del servidor
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (error) {
      console.error("Error al guardar la cita en Postgres:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // PANTALLA DE ÉXITO (Confirmación Visual Final)
  if (isSuccess) {
    return (
      <div className='flex flex-col items-center justify-center text-center py-8 px-4 animate-fade-in gap-5'>
        <div className='w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl shadow-md shadow-emerald-500/10 animate-bounce'>
          ✓
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-black text-gray-900'>¡Reservación Confirmada!</h2>
          <p className='text-sm text-gray-500 max-w-sm mx-auto'>
            La cita ha sido registrada exitosamente en el sistema médico. Se ha enviado una notificación al correo electrónico.
          </p>
        </div>

        {/* Resumen compacto de salida */}
        <div className='bg-gray-50 border border-gray-100 rounded-2xl p-4 w-full max-w-sm text-left flex flex-col gap-2 mt-2 text-xs font-semibold text-gray-600'>
          <p>👨‍⚕️ <span className='text-gray-900 font-bold'>{reservaData.medicoNombre}</span></p>
          <p>📅 <span className='text-gray-900 font-bold capitalize'>{fechaFormateada}</span> a las <span className='text-fuchsia-900 font-bold'>{reservaData.hora}</span></p>
          <p>👤 Paciente: <span className='text-gray-900 font-bold'>{reservaData.pacienteId === 'nuevo-familiar' ? reservaData.nuevoPaciente?.nombre : 'Carlos Mendoza'}</span></p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6 w-full animate-fade-in'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-xl font-black text-gray-800'>Verifica los datos de la cita</h3>
        <p className='text-xs text-gray-400 font-medium uppercase tracking-wider'>Paso final antes de registrar en el sistema</p>
      </div>

      {/* DISEÑO DEL TICKET ESTILOSÍSIMO */}
      <div className='w-full border border-gray-100 rounded-3xl bg-white shadow-xl shadow-gray-100/40 overflow-hidden relative'>
        
        {/* Decoración superior de color */}
        <div className='h-2 w-full bg-linear-to-r from-fuchsia-600 to-blue-600' />

        <div className='p-6 flex flex-col gap-5'>
          
          {/* BLOQUE 1: EL PROFESIONAL */}
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-900 flex items-center justify-center font-bold text-lg shrink-0 border border-fuchsia-100/50'>
              👨‍⚕️
            </div>
            <div className='flex flex-col'>
              <span className='text-2xs font-bold text-gray-400 uppercase tracking-widest'>Médico Especialista</span>
              <span className='text-base font-bold text-gray-900'>{reservaData.medicoNombre || 'Dr. No seleccionado'}</span>
              <span className='text-xs font-bold text-fuchsia-900'>{reservaData.medicoEspecialidad}</span>
            </div>
          </div>

          <hr className='border-gray-100 border-dashed' />

          {/* BLOQUE 2: FECHA Y HORA */}
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-100/50'>
              📅
            </div>
            <div className='flex flex-col'>
              <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Horario Asignado</span>
              <span className='text-sm font-bold text-gray-900 capitalize'>{fechaFormateada}</span>
              <span className='text-xs font-bold text-emerald-700 mt-0.5'>⏰ Bloque: {reservaData.hora}</span>
            </div>
          </div>

          <hr className='border-gray-100 border-dashed' />

          {/* BLOQUE 3: PACIENTE */}
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0 border border-blue-100/50'>
              👤
            </div>
            <div className='flex flex-col mr-auto'>
              <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Paciente Registrado</span>
              <span className='text-sm font-bold text-gray-900'>
                {reservaData.pacienteId === 'nuevo-familiar' 
                  ? reservaData.nuevoPaciente?.nombre 
                  : 'Carlos Mendoza (Titular)'}
              </span>
              {reservaData.motivo && (
                <span className='text-xs text-gray-500 font-medium mt-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg italic max-w-xs'>
                  "{reservaData.motivo}"
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Detalle visual de ticket (Cortes circulares a los lados) */}
        <div className='w-4 h-4 bg-gray-50/50 border border-gray-100 rounded-full absolute -left-2 top-[38%] shadow-inner' />
        <div className='w-4 h-4 bg-gray-50/50 border border-gray-100 rounded-full absolute -right-2 top-[38%] shadow-inner' />
      </div>

      {/* BOTONES FINALES DE NAVEGACIÓN Y ENVÍO */}
      <div className='flex justify-between items-center mt-4 border-t border-gray-100 pt-4 w-full'>
        <button 
          type='button' 
          onClick={onBack} 
          disabled={isSaving}
          className='text-sm font-bold text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50 transition-colors'
        >
          ← Modificar datos
        </button>
        
        <button
          type='button'
          onClick={handleConfirmarCita}
          disabled={isSaving}
          className='bg-linear-to-r from-fuchsia-900 to-fuchsia-900 text-white font-bold px-8 py-3 rounded-full text-sm shadow-xl shadow-fuchsia-900/20 hover:from-fuchsia-900 hover:to-fuchsia-900 transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2'
        >
          {isSaving ? (
            <>
              <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              Guardando en sistema...
            </>
          ) : (
            'Confirmar y Agendar Cita'
          )}
        </button>
      </div>
    </div>
  )
}
