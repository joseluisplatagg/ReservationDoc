import { Card, Carousel } from "flowbite-react";
import React, { useState, useEffect  } from 'react';
import Hero from "../../layouts/Hero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
const [selectedId, setSelectedId] = useState(null);


  // 2. Arreglo con la información y descripciones breves de tus servicios
  const servicios = [
    {
      id: 1,
      titulo: "Bienestar materno integral",
      descripcion: "Paquete prenatal- Incluye valoración.",
      icon: faTrophy
    },
    {
      id: 2,
      titulo: "Ultrasonido Estructural",
      descripcion: `Nos permite evaluar el crecimiento y desarrollo del feto de manera minuciosa tambien es conocido 
                    como ultrasonido anatómico y es parte esesncial para el cuidado prenatal."`,
      icon: faTrophy
    },
    {
      id: 3,
      titulo: "Consulta Ginecológica",
      descripcion: "ncluye la prevención, el diagnóstico y el tratamiento de afecciones ginecológicas.",
      icon: faTrophy
    }
  ];
    return(
        <>
        <Hero title={"Servicios"} image={""} className=""/>
       {/* 1. Ajustamos las alturas del contenedor padre para que quepa todo el contenido en móvil (h-[550px]) y escritorio (md:h-[450px]) */}
        {/* ESTO FORZARÁ AL CARRUSEL A SALIRSE DE LA MITAD DE LA PANTALLA EN SERVICES */}
        <div className="relative w-screen! left-1/2 right-1/2 -translate-x-1/2 h-64 md:h-112.5 overflow-hidden">
            <Carousel 
                className="w-full h-full" 
                slide={true} 
                slideInterval={3000}
            >
                {/* SLIDE 1 */}
                <div key="slide-tradicionales" className="relative w-full h-full bg-zinc-950 flex items-center">
                    <img className="absolute inset-0 w-full h-full object-cover opacity-50 block" src="/tamalesTradicionales.jpg" alt="Tamales tradicionales" />
                    <div className="relative z-10 p-8 md:p-24 max-w-2xl text-white">
                        <h5 className="mb-3 text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                            Ginecología
                        </h5>
                        <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
                            Estudios de coloscopia, papanicolau con el más alto nivel de precisión y cuidado para la detección temprana de problemas de salud ginecológica.
                        </p>
                    </div>
                </div>

                {/* SLIDE 2 */}
                <div key="slide-especiales" className="relative w-full h-full bg-zinc-950 flex items-center">
                    <img className="absolute inset-0 w-full h-full object-cover opacity-50 block" src="/tamalesOaxaqueños.jpg" alt="Tamales Especiales" />
                    <div className="relative z-10 p-8 md:p-24 max-w-2xl text-white">
                        <h5 className="mb-3 text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                            Ecografía 4D y 5D
                        </h5>
                        <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
                            Equipo de alta resolución, visualización fácil y rápida con interfaz probada.
                        </p>
                    </div>
                </div>

                {/* SLIDE 3 */}
                <div key="slide-bebidas" className="relative w-full h-full bg-zinc-950 flex items-center">
                    <img className="absolute inset-0 w-full h-full object-cover opacity-50 block" src="/atoles.jpg" alt="Bebidas" />
                    <div className="relative z-10 p-8 md:p-24 max-w-2xl text-white">
                        <h5 className="mb-3 text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                            Atención en parto y cesárea
                        </h5>
                        <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
                            Bienestar de la madre y el bebé, brindando apoyo integral en este momento tan especial.
                        </p>
                    </div>
                </div>

                {/* SLIDE 4 */}
                <div key="slide-bebidas" className="relative w-full h-full bg-zinc-950 flex items-center">
                    <img className="absolute inset-0 w-full h-full object-cover opacity-50 block" src="/atoles.jpg" alt="Bebidas" />
                    <div className="relative z-10 p-8 md:p-24 max-w-2xl text-white">
                        <h5 className="mb-3 text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                            Histeroscopia
                        </h5>
                        <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
                            Diagnóstico y tratamiento de trastornos uterinos, utilizando técnicas avanzadas y minimamente invasivas.
                        </p>
                    </div>
                </div>
            </Carousel>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 ssm:pt-80 md:pt-10 pb-10">
      
      {/* 2. REJILLA DINÁMICA: 1 columna en móvil, 3 columnas en pantallas medianas/grandes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {servicios.map((servicio) => {
          const isSelected = selectedId === servicio.id;
          const hasSelection = selectedId !== null;
          const isDimmed = hasSelection && !isSelected;

          return (
            <div
              key={servicio.id}
              onClick={() => setSelectedId(servicio.id)}
              className={`relative flex flex-col items-center text-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 shadow-xl
                ${isSelected 
                  ? 'bg-amber-400 border-amber-500 scale-[1.03] text-zinc-950 z-10' 
                  : isDimmed
                    ? 'bg-gray-50/50 dark:bg-blue-700/30 border-transparent opacity-30 scale-[0.97]'
                    : 'bg-white dark:bg-blue-700/40 border-amber-300/60 hover:border-amber-400 text-gray-900 dark:text-white'
                }`}
            >
              {/* Contenedor del Icono superior */}
              <div className="mb-4 flex justify-center items-center w-16 h-16 rounded-full bg-amber-50 dark:bg-zinc-800 shadow-inner">
                <FontAwesomeIcon 
                  icon={servicio.icon} 
                  className={`text-3xl transition-colors duration-300
                    ${isSelected ? 'text-amber-300' : 'text-yellow-400'}`}
                />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="flex flex-col items-center">
                <h4 className={`font-sans font-stretch-semi-expanded italic uppercase tracking-wider font-bold text-xl mb-2
                  ${isSelected ? 'no-underline' : 'underline decoration-amber-300'}`}>
                  {servicio.titulo}
                </h4>
                <p className={`text-sm font-medium leading-relaxed transition-colors duration-300
                  ${isSelected ? 'text-amber-950' : 'text-gray-500 dark:text-gray-100'}`}>
                  {servicio.descripcion}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* Botón para restablecer el estado y activar todas las tarjetas de nuevo */}
      {selectedId !== null && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setSelectedId(null)}
            className="px-5 py-2 text-sm bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 rounded-full font-bold shadow-md hover:scale-105 transition-transform duration-200"
          >
            Mostrar todos los servicios
          </button>
        </div>
      )}
      
    </div>
         
        </>
    )
}

export default Services;

