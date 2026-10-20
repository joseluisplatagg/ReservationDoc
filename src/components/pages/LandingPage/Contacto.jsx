import Title from "../../layouts/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJarWheat, faClock,faEarthAmericas,faEnvelope,faPhoneVolume} from '@fortawesome/free-solid-svg-icons';


const Contacto = () => {

    return(
      <>
        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-fuchsia-900 border border-default rounded-2xl shadow-xl my-8">
    
            {/* ENCABEZADO DE SECCIÓN */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-default mb-6">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/40 rounded-full flex items-center justify-center shadow-inner mb-3">
                    <FontAwesomeIcon 
                        icon={faJarWheat}
                        className="text-3xl text-amber-700 dark:text-white font-extrabold"
                    />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
                    Horarios y medios de comunicación
                </h3>
            </div>

            {/* LISTA DE INFORMACIÓN (Alineación perfecta por filas) */}
            <div className="flex flex-col gap-6">
                
                {/* FILA 1: HORARIOS */}
                <div className="flex flex-col ssm:flex-row items-center ssm:items-start text-center ssm:text-start gap-4 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-pink-400 transition-colors duration-200">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center text-2xl text-amber-600 dark:text-white">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-gray-100 tracking-wider">Horario de atención</span>
                        <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                            Lunes a Domingo de 06:00 - 23:00
                        </p>
                    </div>
                </div>

                {/* FILA 2: DIRECCIÓN */}
                <div className="flex flex-col ssm:flex-row items-center ssm:items-start text-center ssm:text-start gap-4 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-pink-400 transition-colors duration-200">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center text-2xl text-amber-600 dark:text-white">
                        <FontAwesomeIcon icon={faEarthAmericas} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-gray-100 tracking-wider">Dirección</span>
                        <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 mt-0.5 leading-relaxed">
                            Ignacio Zaragoza 2, Centro., Iguala de la Independencia, Mexico, 40000
                        </p>
                    </div>
                </div>

                {/* FILA 3: CORREO */}
                <div className="flex flex-col ssm:flex-row items-center ssm:items-start text-center ssm:text-start gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-pink-400 transition-colors duration-200">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center text-2xl text-amber-600 dark:text-white">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-gray-100 tracking-wider">Correo Electrónico</span>
                        <a href="mailto:fastullido@gmail.com" className="text-sm md:text-base font-semibold text-brand underline hover:no-underline mt-0.5">
                            fastullido@gmail.com
                        </a>
                    </div>
                </div>

                {/* FILA 4: TELÉFONO */}
                <div className="flex flex-col ssm:flex-row items-center ssm:items-start text-center ssm:text-start gap-4 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-pink-400 transition-colors duration-200">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center text-2xl text-amber-600 dark:text-white">
                        <FontAwesomeIcon icon={faPhoneVolume} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-gray-100 tracking-wider">Teléfono de contacto</span>
                        <p className="text-sm md:text-base font-black text-gray-900 dark:text-white tracking-wide mt-0.5">
                            (733) 333 3181
                        </p>
                    </div>
                </div>

            </div>
        </div>

      </>
    )
    
}

export default Contacto;