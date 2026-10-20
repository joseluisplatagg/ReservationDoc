import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Datos Mock de Expedientes de la Base de Datos
const EXPEDIENTES_MOCK = [
  { id: 'EXP-1024', nombre: 'Carlos Mendoza', edad: 28, tipoSangre: 'O+', ultimaConsulta: '2026-10-15', diagnostico: 'Control de hipertensión arterial esencial.', medico: 'Dr. Alejandro Ríos', estado: 'activo' },
  { id: 'EXP-1025', nombre: 'Ana López Torres', edad: 34, tipoSangre: 'A+', ultimaConsulta: '2026-10-12', diagnostico: 'Seguimiento post-operatorio de rodilla.', medico: 'Dra. Elena Gómez', estado: 'activo' },
  { id: 'EXP-1026', nombre: 'Sofía Ríos Benítez', edad: 19, tipoSangre: 'O-', ultimaConsulta: '2026-09-28', diagnostico: 'Rinitis alérgica estacional severa.', medico: 'Dr. Alejandro Ríos', estado: 'observacion' },
  { id: 'EXP-1027', nombre: 'Roberto González', edad: 52, tipoSangre: 'B+', ultimaConsulta: '2026-08-14', diagnostico: 'Chequeo general anual / Laboratorios.', medico: 'Dra. Elena Gómez', estado: 'inactivo' },
];

export function FilesPacients(){
const [busqueda, setBusqueda] = useState('');
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(EXPEDIENTES_MOCK[0]);

  // Filtrado de expedientes en tiempo real por Nombre o Número de Expediente
  const expedientesFiltrados = useMemo(() => {
    return EXPEDIENTES_MOCK.filter(exp => 
      exp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.id.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

  return (
    <div className='w-full flex flex-col gap-6 animate-fade-in text-left'>
      
      {/* 🔍 SECCIÓN SUPERIOR: CONTROL Y BÚSQUEDA */}
      <div className='w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-base font-black text-gray-900 tracking-tight'>Expedientes Clínicos</h2>
          <p className='text-2xs font-bold text-gray-400 uppercase tracking-wider'>Gestión de Historias Médicas</p>
        </div>
        
        {/* Input de Búsqueda Estilizado */}
        <div className='w-full sm:w-72 relative'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-xs'>
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Buscar por nombre o folio..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className='w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all'
          />
        </div>
      </div>

      {/* 💻 DISTRIBUCIÓN EN DOS COLUMNAS */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full'>
        
        {/* 📋 COLUMNA IZQUIERDA: LISTADO DE EXPEDIENTES (Ocupa 7 de 12 columnas) */}
        <div className='lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden'>
          <div className='overflow-x-auto w-full'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
                  <th className='p-4'>Folio / Paciente</th>
                  <th className='p-4 hidden sm:table-cell'>Última Cita</th>
                  <th className='p-4'>Estado</th>
                  <th className='p-4 text-center'>Acción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50 text-xs font-semibold text-gray-600'>
                {expedientesFiltrados.length > 0 ? (
                  expedientesFiltrados.map((exp) => (
                    <tr 
                      key={exp.id} 
                      onClick={() => setPacienteSeleccionado(exp)}
                      className={`hover:bg-fuchsia-50/20 transition-colors cursor-pointer
                        ${pacienteSeleccionado?.id === exp.id ? 'bg-fuchsia-50/40' : ''}
                      `}
                    >
                      <td className='p-4 flex flex-col gap-0.5'>
                        <span className='text-[10px] text-fuchsia-900 font-mono font-bold'>{exp.id}</span>
                        <span className='text-gray-900 font-bold'>{exp.name || exp.nombre}</span>
                      </td>
                      <td className='p-4 hidden sm:table-cell text-gray-500 font-medium'>
                        {exp.ultimaConsulta}
                      </td>
                      <td className='p-4'>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border
                          ${exp.estado === 'activo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                          ${exp.estado === 'observacion' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                          ${exp.estado === 'inactivo' ? 'bg-gray-50 text-gray-500 border-gray-200' : ''}
                        `}>
                          {exp.estado}
                        </span>
                      </td>
                      <td className='p-4 text-center' onClick={(e) => e.stopPropagation()}>
                        <button className='p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-fuchsia-900 transition-colors cursor-pointer'>
                          ⚙️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className='p-8 text-center text-gray-400 italic font-medium'>
                      No se encontraron expedientes que coincidan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📑 COLUMNA DERECHA: VISTA RÁPIDA DEL EXPEDIENTE SELECCIONADO (Ocupa 5 de 12 columnas) */}
        <div className='lg:col-span-5 flex flex-col gap-4'>
          {pacienteSeleccionado ? (
            <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col gap-5'>
              
              {/* Encabezado del Perfil Clínico */}
              <div className='flex items-center gap-3.5 border-b border-gray-50 pb-4'>
                <div className='w-11 h-11 rounded-xl bg-fuchsia-900 text-white flex items-center justify-center font-bold text-sm shadow-sm'>
                  {pacienteSeleccionado.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className='flex flex-col'>
                  <span className='text-[10px] text-fuchsia-900 font-mono font-bold'>{pacienteSeleccionado.id}</span>
                  <h3 className='text-sm font-bold text-gray-900'>{pacienteSeleccionado.nombre}</h3>
                  <div className='flex gap-2 text-[11px] font-medium text-gray-400 mt-0.5'>
                    <span>Edad: <strong className='text-gray-600'>{pacienteSeleccionado.edad} años</strong></span>
                    <span>•</span>
                    <span>Grupo: <strong className='text-fuchsia-900'>{pacienteSeleccionado.tipoSangre}</strong></span>
                  </div>
                </div>
              </div>

              {/* Detalles Clínicos */}
              <div className='flex flex-col gap-3 text-xs font-semibold'>
                <div className='flex flex-col gap-1'>
                  <span className='text-[10px] text-gray-400 uppercase tracking-wider font-bold'>Último Diagnóstico</span>
                  <div className='bg-gray-50 border border-gray-100/50 p-3 rounded-xl text-gray-700 leading-relaxed font-medium'>
                    {pacienteSeleccionado.diagnostico}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mt-1'>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-[10px] text-gray-400 uppercase tracking-wider font-bold'>Médico Tratante</span>
                    <span className='text-gray-800 font-bold'>{pacienteSeleccionado.medico}</span>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-[10px] text-gray-400 uppercase tracking-wider font-bold'>Última Visita</span>
                    <span className='text-gray-800 font-bold'>{pacienteSeleccionado.ultimaConsulta}</span>
                  </div>
                </div>
              </div>

              {/* Botones de Operación Médica */}
              <div className='flex gap-2.5 w-full mt-2 pt-4 border-t border-gray-50'>
                <button className='flex-1 bg-fuchsia-900 hover:bg-fuchsia-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer text-center'>
                  📄 Abrir Historial
                </button>
                <button className='px-3.5 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl text-xs font-bold transition-colors cursor-pointer'>
                  ✏️ Editar
                </button>
              </div>

            </div>
          ) : (
            <div className='bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 italic'>
              Selecciona un paciente de la tabla para ver el resumen clínico.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}