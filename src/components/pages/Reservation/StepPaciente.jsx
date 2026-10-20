// src/components/reservar/StepPaciente.jsx
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function StepPaciente({ reservaData, onNext }) {
  // 1. Simulación de pacientes ya registrados en la cuenta (Tú + Familiares)
  // En producción, esto vendría de un fetch de tu base de datos
  const [pacientesRegistrados] = useState([
    { id: 'user-01', nombre: 'Carlos Mendoza', relacion: 'Titular de la cuenta', edad: 34 },
    { id: 'fam-01', nombre: 'Sofía Mendoza', relacion: 'Hija', edad: 8 },
    { id: 'fam-02', nombre: 'María Elena Ruiz', relacion: 'Madre', edad: 62 },
  ])

  // Estados locales para controlar la selección
  const [selectedId, setSelectedId] = useState(reservaData.pacienteId || 'user-01')
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [motivo, setMotivo] = useState(reservaData.motivo || '')
  const [pacienteSeleccionadoId, setPacienteSeleccionadoId] = useState(reservaData.pacienteId || '')

  // Estado para el formulario de un nuevo familiar
  const [nuevoFamiliar, setNuevoFamiliar] = useState({
    nombre: '',
    relacion: '',
    edad: ''
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Estructuramos los datos finales para enviarlos al contenedor principal
    onNext({
      pacienteId: isAddingNew ? 'nuevo-familiar' : selectedId,
      nuevoPaciente: isAddingNew ? nuevoFamiliar : null,
      motivo: motivo
    })
  }

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-col gap-6 w-full animate-fade-in'>
      
      {/* SELECCIÓN DE PACIENTE */}
      <div className='flex flex-col gap-3'>
        <label className='text-sm font-bold text-gray-700'>¿Quién asistirá a la consulta médica?</label>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {pacientesRegistrados.map((paciente) => (
            <div
              key={paciente.id}
              onClick={() => {
                setSelectedId(paciente.id)
                setPacienteSeleccionadoId(paciente.id)
                setIsAddingNew(false)
              }}
              className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 select-none
                ${selectedId === paciente.id && !isAddingNew
                  ? 'border-fuchsia-900 bg-fuchsia-50/50 shadow-md shadow-fuchsia-900/10' 
                  : 'border-gray-200 hover:border-fuchsia-900/50'}`}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                ${selectedId === paciente.id && !isAddingNew ? 'border-fuchsia-900 bg-fuchsia-900' : 'border-gray-300'}`}
              >
                {selectedId === paciente.id && !isAddingNew && <div className='w-2 h-2 rounded-full bg-white' />}
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-sm text-gray-800'>{paciente.nombre}</span>
                <span className='text-xs text-gray-500'>{paciente.relacion} • {paciente.edad} años</span>
              </div>
            </div>
          ))}

          {/* Opción para registrar otro paciente en el momento */}
          <div
            onClick={() => setIsAddingNew(true)}
            className={`p-4 border rounded-xl border-dashed flex items-center gap-3 cursor-pointer transition-all duration-200 select-none
              ${isAddingNew 
                ? 'border-fuchsia-900 bg-fuchsia-50/50 shadow-md shadow-fuchsia-900/10' 
                : 'border-gray-300 hover:border-fuchsia-900/50 text-gray-500'}`}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
              ${isAddingNew ? 'border-fuchsia-900 bg-fuchsia-900' : 'border-gray-300'}`}
            >
              {isAddingNew && <div className='w-2 h-2 rounded-full bg-white' />}
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon='fa-solid fa-circle-plus' className='text-fuchsia-900 text-lg' />
              <span className='font-bold text-sm'>Alguien más (Familiar / Dependiente)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO CONDICIONAL PARA NUEVO FAMILIAR */}
      {isAddingNew && (
        <div className='p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col gap-4 animate-slide-down'>
          <span className='text-xs font-bold text-gray-500 uppercase tracking-wider'>Datos del nuevo paciente</span>
          
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            <input 
              className='h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-fuchsia-900 bg-white'
              placeholder='Nombre Completo' type='text' required={isAddingNew}
              value={nuevoFamiliar.nombre}
              onChange={(e) => setNuevoFamiliar({...nuevoFamiliar, nombre: e.target.value})}
            />
            <input 
              className='h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-fuchsia-900 bg-white'
              placeholder='Parentesco (ej. Hijo, Esposo)' type='text' required={isAddingNew}
              value={nuevoFamiliar.relacion}
              onChange={(e) => setNuevoFamiliar({...nuevoFamiliar, relacion: e.target.value})}
            />
            <input 
              className='h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-fuchsia-900 bg-white'
              placeholder='Edad' type='number' min='0' max='120' required={isAddingNew}
              value={nuevoFamiliar.edad}
              onChange={(e) => setNuevoFamiliar({...nuevoFamiliar, edad: e.target.value})}
            />
          </div>
        </div>
      )}

      {/* MOTIVO DE CONSULTA (Texto abierto para pre-diagnóstico) */}
      <div className='flex flex-col gap-2'>
        <label htmlFor='motivo' className='text-sm font-bold text-gray-700'>Motivo de la consulta (Opcional)</label>
        <textarea
          id='motivo'
          rows='3'
          className='w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-900 focus:border-fuchsia-900 placeholder:text-gray-400'
          placeholder='Describe brevemente los síntomas o el motivo del chequeo...'
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
      </div>

      {/* BOTÓN CONTINUAR */}
      <div className='flex justify-end mt-4 border-t border-gray-100 pt-4'>
        <button 
          type='submit'
          disabled={!pacienteSeleccionadoId}
          className={`font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200
            ${pacienteSeleccionadoId 
              ? 'bg-linear-to-r from-fuchsia-900 to-fuchsia-900 text-white font-bold px-8 py-3 rounded-full text-sm shadow-xl shadow-fuchsia-900/20 hover:from-fuchsia-900 hover:to-fuchsia-900 transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Continuar al Calendario →
        </button>
      </div>

    </form>
  )
}
