// src/components/reservar/StepMedico.jsx
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faHospitalUser, faUserDoctor, faNotesMedical,faHouseMedicalCircleCheck} from '@fortawesome/free-solid-svg-icons';

export default function StepMedico({ reservaData, onNext, onBack }) {
  // 1. Simulación de médicos. En producción, esto vendría de un 'fetch' a tu tabla de PostgreSQL
  const [medicos] = useState([
    { 
      id: 1, 
      nombre: 'Dr. Fernando Astudillo', 
      especialidad: 'Ginecología y Obstetricia', 
      universidad: 'UNAM • Céd. 1234567',
      disponibilidad: 'Disponible hoy',
      colorBadge: 'bg-emerald-100 text-emerald-700'
    },
    /* { 
      id: 2, 
      nombre: 'Dra. Beatriz Elena Silva', 
      especialidad: 'Pediatría Médica', 
      universidad: 'UANL • Céd. 7654321',
      disponibilidad: 'Próxima cita mañana',
      colorBadge: 'bg-cyan-100 text-fuchsia-900'
    },
    { 
      id: 3, 
      nombre: 'Dr. Carlos Mendoza Solís', 
      especialidad: 'Medicina General', 
      universidad: 'IPN • Céd. 9876543',
      disponibilidad: 'Agenda llena esta semana',
      colorBadge: 'bg-rose-100 text-rose-700'
    } */
  ])

  // Estado local para capturar al médico seleccionado (inicializa con lo que ya tenga el contenedor si regresas atrás)
  const [medicoSeleccionadoId, setMedicoSeleccionadoId] = useState(reservaData.medicoId || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!medicoSeleccionadoId) return

    // Buscamos el objeto completo del médico seleccionado para guardarlo en el resumen
    const medicoCompleto = medicos.find(m => m.id === Number(medicoSeleccionadoId))

    // Enviamos los datos al contenedor principal
    onNext({
      medicoId: medicoSeleccionadoId,
      medicoNombre: medicoCompleto?.nombre,
      medicoEspecialidad: medicoCompleto?.especialidad
    })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full animate-fade-in'>
      <div className='flex flex-col gap-3'>
        <label className='text-sm font-bold text-gray-700'>
          <FontAwesomeIcon  icon={faUserCheck} /> Selecciona al profesional de la salud que ofrecerá el servicio:
        </label>

        {/* CONTENEDOR GRID RESPONSIVO */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          {medicos.map((medico) => (
            <div
              key={medico.id}
              onClick={() => setMedicoSeleccionadoId(medico.id)}
              className={`p-4 border rounded-2xl flex items-start gap-4 cursor-pointer transition-all duration-200 select-none bg-white relative
                ${medicoSeleccionadoId === medico.id
                  ? 'border-fuchsia-900 bg-fuchsia-50/30 shadow-md shadow-fuchsia-900/10 scale-[1.01]' 
                  : 'border-gray-100 hover:border-fuchsia-900/50 hover:shadow-sm'}`}
            >
              {/* Avatar Estilizado del Médico */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner shrink-0
                ${medicoSeleccionadoId === medico.id ? 'bg-fuchsia-900 text-white' : 'bg-gray-100 text-fuchsia-900'}`}
              >
                {medico.nombre.split(' ')[1]?.charAt(0) || 'D'}
              </div>

              {/* Información Profesional */}
              <div className='flex flex-col gap-0.5 flex-1 pr-6'>
                <span className='font-bold text-sm text-gray-800'><FontAwesomeIcon  icon={faUserDoctor} /> {medico.nombre}</span>
                <span className='text-xs font-bold text-fuchsia-900'><FontAwesomeIcon  icon={faNotesMedical} /> {medico.especialidad}</span>
                <span className='text-[11px] text-gray-400 font-medium'>  {medico.universidad}</span>
                
                {/* Badge de Disponibilidad */}
                <div className='mt-2'>
                  <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${medico.colorBadge}`}>
                    {medico.disponibilidad} <FontAwesomeIcon  icon={faHouseMedicalCircleCheck} />
                  </span>
                </div>
              </div>

              {/* Radio Button Customizado de Selección */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors absolute right-4 top-4
                ${medicoSeleccionadoId === medico.id ? 'border-fuchsia-900 bg-fuchsia-900' : 'border-gray-300'}`}
              >
                {medicoSeleccionadoId === medico.id && <div className='w-2 h-2 rounded-full bg-white' />}
              </div>
            </div>
          ))}
        </div>
      </div>

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
          disabled={!medicoSeleccionadoId}
          className={`font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200
            ${medicoSeleccionadoId 
              ? 'bg-linear-to-r from-fuchsia-900 to-fuchsia-900 text-white font-bold px-8 py-3 rounded-full text-sm shadow-xl shadow-fuchsia-900/20 hover:from-fuchsia-900 hover:to-fuchsia-900 transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Ver disponibilidad →
        </button>
      </div>
    </form>
  )
}
