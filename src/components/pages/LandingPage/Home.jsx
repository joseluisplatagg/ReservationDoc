import { createRoute } from '@tanstack/react-router'
import { Route } from '../../../routes/__root'

const Home = () => {    
    return(
        <>
            <section className="relative bg-no-repeat bg-right bg-neutral-primary dark:bg-[url('/tamalesHero.svg')] pt-24 md:pt-32 pb-12 overflow-hidden border-b border-default">
    
            {/* Capa de degradado sutil para asegurar que las letras se lean sobre la imagen de fondo */}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-primary via-neutral-primary/80 to-transparent z-0 pointer-events-none"></div>

            <div className="py-8 px-5 mx-auto max-w-7xl text-center lg:py-16 z-10 relative">
                
                {/* BANNER DE ALERTA: Descuento y correo */}
                <div className="w-auto inline-flex items-center p-1 pe-3 mb-6 text-sm text-fg-brand-strong rounded-full bg-brand-softer border border-brand-subtle animate-pulse shadow-sm" role="alert">
                    <span className="bg-yellow-400 text-zinc-900 font-bold text-xs py-0.5 px-3 rounded-full uppercase tracking-wider">
                        Nuevo
                    </span>
                    <div className="ms-2 text-xs md:text-sm font-medium">
                        Obten un descuento enviando un correo a: <a href="mailto:fastudillo112233@gmail.com" className="font-bold underline hover:no-underline text-brand">fastudillo112233@gmail.com</a>
                    </div>
                    {/* SVG corregido con camelCase para evitar errores en React */}
                    <svg className="w-4 h-4 ms-2 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </div>

                {/* TÍTULO PRINCIPAL (H1) */}
                <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-normal md:tracking-tight text-gray-900 dark:text-blue-800/70 uppercase leading-[1.1] drop-shadow-sm">
                    Ginecólogo <br className="hidden md:block" />
                    Obstetra
                </h1>


                {/* SUBTÍTULO: Años de experiencia */}
                <p className="mb-10 text-amber-700 dark:text-amber-400 font-extrabold text-lg md:text-2xl tracking-wide uppercase">
                    Especialista en Cirugía Ginecológica de Mínima Invasión
                </p>

                {/* CONTENEDOR DE OPINIONES: Corregido a 3 columnas simétricas */}
                <div className="mt-8">
                    {/* <p className="text-xs uppercase font-bold tracking-widest text-gray-400 dark:text-zinc-500 mb-6">
                        Lo que dicen nuestros clientes
                    </p> */}
                    
                </div>

            </div>
        </section>

        </>
    )
}

export default Home;

