// src/routes/reservar.jsx
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState,useEffect, useMemo  } from 'react'

// Componentes secundarios que crearemos a continuación (Paso 1, 2 , 3 y 4)
import { StepPaciente } from './StepPaciente'
import  StepMedico  from './StepMedico'
import  ReservationConfirm  from './ReservationConfirm'
import { Calendar } from './Calendar'
// import { StepResumen } from '../components/reservar/StepResumen'

const CITAS_MOCK = [
  { id: 1, medicoNombre: 'Dr. Alejandro Ríos', hora: '09:00', fecha: '2026-10-20', pacienteId: '1', pacienteNombre: 'Carlos Mendoza' },
  { id: 2, medicoNombre: 'Dra. Elena Gómez', hora: '10:00', fecha: '2026-10-20', pacienteId: '2', pacienteNombre: 'Ana López' },
  { id: 3, medicoNombre: 'Dr. Alejandro Ríos', hora: '11:00', fecha: '2026-10-21', pacienteId: 'nuevo-familiar', nuevoPaciente: { nombre: 'Sofía Ríos' } },
  { id: 4, medicoNombre: 'Dra. Elena Gómez', hora: '09:00', fecha: '2026-10-22', pacienteId: '1', pacienteNombre: 'Carlos Mendoza' },
];

export default function ScheduleToday() {
 const [doctorFiltrado, setDoctorFiltrado] = useState('todos');
  const [horaFiltrada, setHoraFiltrada] = useState('todas');

  const listaDoctores = useMemo(() => ['todos', ...new Set(CITAS_MOCK.map(c => c.medicoNombre))], []);
  const listaHoras = useMemo(() => ['todas', ...new Set(CITAS_MOCK.map(c => c.hora).sort())], []);

  const citasFiltradas = useMemo(() => {
    return CITAS_MOCK.filter(cita => {
      const coincideDoctor = doctorFiltrado === 'todos' || cita.medicoNombre === doctorFiltrado;
      const coincideHora = horaFiltrada === 'todas' || cita.hora === horaFiltrada;
      return coincideDoctor && coincideHora;
    });
  }, [doctorFiltrado, horaFiltrada]);

  // Agrupación cronológica para la lista de la derecha
  const citasAgrupadasPorHora = useMemo(() => {
    const grupos = {};
    citasFiltradas.forEach(cita => {
      if (!grupos[cita.hora]) grupos[cita.hora] = [];
      grupos[cita.hora].push(cita);
    });
    return Object.keys(grupos).sort().reduce((obj, key) => {
      obj[key] = grupos[key];
      return obj;
    }, {});
  }, [citasFiltradas]);

  return (
    // Incrementamos el max-w a 5xl o 6xl para dar espacio cómodo a las dos columnas
    <div className='w-full max-w-5xl mx-auto px-5 pt-10 md:py-16 flex flex-col gap-8'>
      
      {/* 1. SECCIÓN DE FILTROS (Arriba ocupando todo el ancho) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm'>
        <div className='flex flex-col gap-1'>
          <label className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>Médico</label>
          <select 
            value={doctorFiltrado} 
            onChange={(e) => setDoctorFiltrado(e.target.value)}
            className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
          >
            {listaDoctores.map(doc => (
              <option key={doc} value={doc}>{doc === 'todos' ? '👨‍⚕️ Todos los doctores' : doc}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>Hora</label>
          <select 
            value={horaFiltrada} 
            onChange={(e) => setHoraFiltrada(e.target.value)}
            className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
          >
            {listaHoras.map(hora => (
              <option key={hora} value={hora}>{hora === 'todas' ? '⏰ Todas las horas' : `${hora} hrs`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 💻 CONTENEDOR BICOLUMNA (Abajo de los filtros) */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full'>
        
        {/* 🧩 LADO IZQUIERDO: CALENDARIO (Ocupa 7 de 12 columnas) */}
        <div className='md:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full flex flex-col justify-center items-center'>
          {/* Le pasamos el modo consulta al calendario para que use la lógica que creamos */}
          <Calendar reservaData={{ fecha: '2026-10-20', hora: '09:00 AM' }} mode="view" />
        </div>

        {/* 📜 LADO DERECHO: RESUMEN CRONOLÓGICO POR HORA (Ocupa 5 de 12 columnas) */}
        <div className='md:col-span-5 flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar'>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white/80 backdrop-blur-sm pb-2 z-10'>
            Agenda del día ({citasFiltradas.length} citas)
          </h3>

          {Object.keys(citasAgrupadasPorHora).length > 0 ? (
            Object.entries(citasAgrupadasPorHora).map(([hora, citasDeEstaHora]) => (
              <div key={hora} className='flex flex-col gap-3 w-full'>
                
                {/* Bloque indicador de hora */}
                <div className='flex items-center gap-2 w-full'>
                  <span className='text-xs font-bold text-fuchsia-950 bg-fuchsia-50 px-2.5 py-1 rounded-lg border border-fuchsia-100/60'>
                    {hora}
                  </span>
                  <div className='h-[1px] bg-gray-100 flex-1' />
                </div>

                {/* Tarjetas asignadas a esa hora */}
                <div className='flex flex-col gap-2.5 pl-1'>
                  {citasDeEstaHora.map((reservaData) => (
                    <div 
                      key={reservaData.id} 
                      className='bg-gray-50 border border-gray-100 rounded-xl p-3.5 w-full text-left flex flex-col gap-1.5 text-[11px] font-semibold text-gray-500 hover:border-fuchsia-200 transition-colors shadow-2xs'
                    >
                      <p className='text-gray-900 font-bold text-xs flex items-center gap-1.5'>
                        <span>👨‍⚕️</span> {reservaData.medicoNombre}
                      </p>
                      <p className='text-gray-700 flex items-center gap-1.5'>
                        <span>👤</span> Paciente: <span className='text-gray-900 font-medium'>{reservaData.pacienteId === 'nuevo-familiar' ? reservaData.nuevoPaciente?.nombre : reservaData.pacienteNombre}</span>
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))
          ) : (
            <div className='text-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs text-gray-400 italic'>
              No hay citas para este criterio.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
