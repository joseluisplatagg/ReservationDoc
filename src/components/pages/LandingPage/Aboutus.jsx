import Hero from "../../layouts/Hero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye } from '@fortawesome/free-solid-svg-icons';
import Ginecologo2 from '../../../../public/Ginecologo2.jpg'

const Aboutus = () =>{

    const descripcion = `Soy El Dr. Fernando Astudillo ginecólogo y obstetra con el firme compromiso de brindar atención médica 
    excepcional a las mujeres en todas las etapas de sus vidas.
    Mi pasión por la medicina y el cuidado de la salud femenina.`;

    const descripcion2 = `En el área de Obstetricia, caminamos de la mano contigo durante el embarazo, el parto y el posparto, 
    asegurando el bienestar tuyo y de tu bebé. En el ámbito de la Ginecología, nos enfocamos en la prevención, el diagnóstico 
    y el tratamiento de padecimientos propios de la mujer, ofreciendo alternativas médicas y quirúrgicas de vanguardia para 
    garantizar tu tranquilidad y calidad de vida..`;

     const mision = `Ofrecer a nuestras pacientes una atención obstétrica de alta especialidad, humana y segura, 
     mediante un equipo médico altamente calificado y tecnología de vanguardia, garantizando el bienestar de la madre y el bebé 
     en cada etapa de la maternidad y promoviendo el nacimiento en un entorno de calidez y confianza.`;

    const vision = `Ser la clínica de especialidad obstétrica líder y referente en nuestra región, reconocida por la excelencia clínica, 
    la innovación en la atención del embarazo de bajo y alto riesgo, y por ser la primera opción de las familias para recibir una 
    experiencia de nacimiento humanizada, segura y memorable.`;

    return(
        <>
           <div className="">
                <Hero title={"Quiénes somos"} image={""} className=""/>                
            </div> 

              <section className="w-full max-w-7xl mx-auto px-5 ssm:pt-10 md:py-16 flex flex-col gap-10">
      
              {/* BLOQUE 1: LA HISTORIA */}
              <div className="bg-neutral-primary-soft p-6 md:p-10 border border-default rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  
                  {/* Contenedor de Imagen Simétrico */}
                  <div className="w-full md:w-2/5 h-64 md:h-80 rounded-xl overflow-hidden shadow-md shrink-0">
                    <img 
                      className="object-cover w-full h-full block hover:scale-105 transition-transform duration-300" 
                      src={Ginecologo2}
                      alt=""
                    />
                  </div>
                  
                  {/* Contenedor de Texto */}
                  <div className="w-full md:w-3/5 flex flex-col text-start justify-center">
                    <span className="text-fuchsia-800 dark:text-fuchsia-800 font-bold text-sm uppercase tracking-wider mb-2">
                      Nuestra Historia
                    </span>
                    <h5 className="mb-4 text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-black">
                      Cálidad de Vida
                    </h5>
                    <div className="space-y-4 text-gray-600 dark:text-gray-700 font-medium leading-relaxed text-justify text-sm md:text-base">
                      <p>{descripcion}</p>
                      <p>{descripcion2}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* BLOQUE 2: MISIÓN Y VISIÓN (Grid de 2 Columnas Simétricas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-primary-soft border border-default rounded-2xl shadow-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-default">
                
                {/* TARJETA: MISIÓN */}
                <div className="flex flex-col items-center justify-between p-8 text-center bg-white/40 dark:bg-pink-700/40 hover:bg-fuchsia-800 dark:hover:bg-fuchsia-800 transition-colors duration-300">
                  <div className="flex flex-col items-center w-full">
                    {/* Contenedor del Icono con un toque más cálido */}
                    <div className="w-20 h-20 bg-cyan-50 dark:bg-cyan-950/40 rounded-full flex items-center justify-center shadow-inner mb-6">
                      <FontAwesomeIcon icon={faBullseye} className="text-4xl text-white font-extrabold" />
                    </div>
                    <h3 className="text-2xl font-black text-heading uppercase tracking-wider dark:text-white mb-4">
                      Misión
                    </h3>
                    <p className="text-gray-600 dark:text-gray-100 font-medium leading-relaxed text-justify text-sm md:text-base px-2 md:px-6">
                      {mision}
                    </p>
                  </div>
                </div>

                {/* TARJETA: VISIÓN */}
                <div className="flex flex-col items-center justify-between p-8 text-center bg-white/40 dark:bg-pink-700/40 hover:bg-fuchsia-800 dark:hover:bg-fuchsia-800 transition-colors duration-300">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/40 rounded-full flex items-center justify-center shadow-inner mb-6">
                      <FontAwesomeIcon icon={faEye} className="text-4xl text-white font-extrabold" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                      Visión
                    </h3>
                    <p className="text-gray-600 dark:text-gray-100 font-medium leading-relaxed text-justify text-sm md:text-base px-2 md:px-6">
                      {vision}
                    </p>
                  </div>
                </div>

              </div>

            </section>
        </>
    );
}
export default Aboutus;