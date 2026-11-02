import { useState, useEffect } from "react";
import { obtenerCita } from '../../../api/calendar'

const ReservationDetail = (props) =>{
    const [reservaData, setReservaData] = useState({hora: '',
        dia: '',
        medicoNombre: '',
        pacienteNombre: ''});

    useEffect(() => {
        if(props.citaId){
            obtenerCita(props.citaId)
                .then((data) => setReservaData(data))
                .catch((err) => console.error(err))
        }
    },[citaId]);

    return(
        <div className='min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-4 md:p-30 animate-fade-in'>
            <div className='w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-md flex flex-col gap-6 text-center'>
                
                {reservaData ? (
                <div className=' rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl shadow-md shadow-emerald-500/10 '>
                ✓
                </div>
                ) : (
                <div className=' rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl shadow-md shadow-red-500/10 '>
                ✗
                </div>
                )}

                <h3 className='text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3'> 
                Detalle de la cita 
                </h3> 

                {reservaData ? (
                <div className='flex flex-col gap-6 w-full items-center'> 

                    {/* Bloque indicador de fecha (Grande y Centrado) */}
                    <div className='flex flex-col items-center gap-2 w-full'> 
                    <span className='text-2xl font-black text-fuchsia-950 bg-fuchsia-50/80 px-6 py-2.5 rounded-2xl border border-fuchsia-100 shadow-2xs tracking-wide'> 
                        {reservaData.fecha || "Sin fecha"} 
                    </span> 
                    <p className='text-xs text-fuchsia-800/60 font-bold uppercase tracking-wider mt-1'>Fecha Confirmada</p>
                    </div> 
                    
                    {/* Bloque indicador de hora (Grande y Centrado) */}
                    <div className='flex flex-col items-center gap-2 w-full'> 
                    <span className='text-2xl font-black text-fuchsia-950 bg-fuchsia-50/80 px-6 py-2.5 rounded-2xl border border-fuchsia-100 shadow-2xs tracking-wide'> 
                        {reservaData.hora || "Sin hora"} 
                    </span> 
                    <p className='text-xs text-fuchsia-800/60 font-bold uppercase tracking-wider mt-1'>Horario Confirmado</p>
                    </div> 

                    {/* Tarjeta de detalle de la cita */}
                    <div className='w-full border-t-2 border-dashed border-gray-200/80 pt-6 mt-2'> 
                    <div className='bg-linear-to-b from-gray-50/50 to-gray-50 border border-gray-100/80 rounded-2xl p-6 w-full flex flex-col gap-4 text-base font-medium text-gray-500 hover:border-fuchsia-200 transition-all duration-300 shadow-2xs'> 
                        
                        {/* Médico */}
                        <div className='flex flex-col gap-1 items-center bg-white border border-gray-50 p-3 rounded-xl w-full'>
                        <span className='text-2xl mb-1'>👨‍⚕️</span>
                        <span className='text-xs text-gray-400 font-bold uppercase tracking-wider'>Médico Especialista</span>
                        <p className='text-gray-900 font-black text-lg'> 
                            {reservaData.medicoNombre} 
                        </p> 
                        </div>

                        {/* Paciente */}
                        <div className='flex flex-col gap-1 items-center bg-white border border-gray-50 p-3 rounded-xl w-full'>
                        <span className='text-2xl mb-1'>👤</span>
                        <span className='text-xs text-gray-400 font-bold uppercase tracking-wider'>Paciente</span>
                        <p className='text-gray-900 font-bold text-base'>
                            {reservaData.pacienteNombre}
                        </p> 
                        </div>

                    </div> 
                    </div> 

                    {/* Mensaje de cortesía inferior */}
                    <p className='text-xs text-gray-400 font-medium mt-4'>
                    * Por favor, presenta este comprobante al llegar a tu recepción.
                    </p>
                </div>
                ) : (
                <div className='flex flex-col items-center justify-center py-12 gap-3'>
                    <span className='text-4xl opacity-40'>🔍</span>
                    <p className='text-sm text-gray-400 font-medium italic'>
                    No hay ninguna cita seleccionada o el enlace es inválido.
                    </p>
                </div>
                )}
                
            </div>
            </div>

    );

}

export default ReservationDetail;