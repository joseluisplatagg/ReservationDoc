// src/routes/reservar.jsx
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState,useEffect  } from 'react'

// Componentes secundarios que crearemos a continuación (Paso 1, 2 , 3 y 4)
import { StepPaciente } from './StepPaciente'
import  StepMedico  from './StepMedico'
import  ReservationConfirm  from './ReservationConfirm'
import { Calendar } from './Calendar'

export default function ReservationSchedule() {
 
  const navigate = useNavigate()
  // 2. Obtenemos el paso actual directamente de la URL gracias a TanStack Router
  const { step } = useSearch({ from: '/scheduleToday' })
 const currentStep = Number(step) || 1
  // 3. Estado centralizado que acumulará toda la información de la reserva
  const [reservaData, setReservaData] = useState({
    pacienteId: '',      // ID del paciente seleccionado (Titular o Familiar)
    nuevoPaciente: null, // Datos si decide registrar un familiar en el momento
    medicoId: '',           
    medicoNombre: '',       
    medicoEspecialidad: '' ,
    fecha: '',          // Fecha seleccionada
    hora: '',           // Hora seleccionada
    motivo: ''          // Breve descripción de los síntomas
  })

   console.log("El paso actual detectado es:", step, "Tipo de dato:", typeof step)

   useEffect(() => {
  // Si el usuario entra a /reservar sin parámetros, le inyectamos ?step=1 de forma limpia
  if (!step) {
    navigate({
      to: '/scheduleToday',
      search: { step: 1 },
      replace: true // Evita que se ensucie el historial con el botón atrás
    })
  }
}, [step, navigate])

  // Función para avanzar al siguiente paso actualizando la URL
  const nextStep = (datosPaso) => {
    setReservaData((prev) => ({ ...prev, ...datosPaso }))
    navigate({
      to: '/scheduleToday',
      search: { step: currentStep  + 1 },
    })
  }

  // Función para retroceder un paso en la URL
  const prevStep = () => {
    navigate({
      to: '/scheduleToday',
      search: { step: currentStep  - 1 },
    })
  }

  return (
    <div className='w-full max-w-2xl mx-auto px-5 pt-10 md:py-26 flex flex-col gap-8'>
      
      {/* INDICADOR VISUAL DE PASOS (Stepper de Google Material Design) */}
      <div className='flex items-center justify-between w-full max-w-md mx-auto mb-4'>
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className='flex items-center flex-1 last:flex-none'>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
              ${currentStep === num ? 'bg-fuchsia-900 text-white shadow-lg shadow-fuchsia-900/30' : 
                currentStep > num ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {currentStep > num ? '✓' : num}
            </div>
            {num < 4 && (
              <div className={`h-1 flex-1 mx-2 transition-colors duration-300
                ${currentStep > num ? 'bg-emerald-600' : 'bg-gray-200'}`} 
              />
            )}
          </div>
        ))}
      </div>

      {/* RENDERIZADO DINÁMICO SEGÚN EL PASO DE LA URL */}
      <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-xl shadow-gray-100/50 min-h-[300px] flex flex-col justify-between'>
        {currentStep === 1 && (
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Paso 1: ¿Para quién es la consulta?</h3>
            
            {/* 
              CORRECCIÓN: Inyectamos el componente real pasándole las propiedades 
              necesarias y eliminamos los divs y botones de simulación viejos.
            */}
            <StepPaciente reservaData={reservaData} onNext={nextStep} />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Paso 2: Selecciona Doctor</h3>
            
            <div className='py-5 w-full flex justify-center'>
              <StepMedico reservaData={reservaData} onNext={nextStep} onBack={prevStep} />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Paso 3: Selecciona Fecha y Hora</h3>
            
            <div className='py-5 w-full flex justify-center'>
              <Calendar reservaData={reservaData} onNext={nextStep} onBack={prevStep} />
            </div>
            
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Paso 4: Confirma los datos de tu cita</h3>
            {/* <StepResumen reservaData={reservaData} onBack={prevStep} /> */}
            <div className='py-5 w-full flex justify-center'>
              <ReservationConfirm reservaData={reservaData} onNext={nextStep} onBack={prevStep} />
            </div>
            <div className='flex justify-between mt-4'>
             
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
