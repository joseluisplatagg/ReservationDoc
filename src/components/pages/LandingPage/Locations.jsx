import Contacto from "./Contacto";
import Hero from "../../layouts/Hero";
import { createRoute } from '@tanstack/react-router'
import { Route } from '../../../routes/__root'

const Locations = () => {
    return(
            <>
            <Hero title={"Contacto"} image={""} className=""/>

            <div className="w-full max-w-7xl mx-auto p-6 bg-neutral-primary-soft rounded-base shadow-xl my-8">
    
    {/* REJILLA DIRECTA: 1 columna en móvil, 2 columnas iguales en escritorio */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        
        {/* LADO IZQUIERDO: EL MAPA */}
        {/* 'w-full h-80 md:h-[450px]' le da una altura fija y proporcional en cualquier pantalla */}
        <div className="w-full h-80 md:h-112.5 rounded-xl overflow-hidden shadow-md">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2677.870518837649!2d-99.5403609316193!3d18.343597596478837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cc3876ce33ea2d%3A0x82e8d52b709f6c13!2sIgnacio%20Zaragoza%202%2C%20Centro%2C%2040000%20Iguala%20de%20la%20Independencia%2C%20Gro.!5e0!3m2!1sen!2smx!4v1791687653501!5m2!1sen!2smx" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* LADO DERECHO: EL FORMULARIO DE CONTACTO */}
        {/* Eliminamos el 'px-15' fijo que desbordaba el diseño en pantallas medianas */}
        <div className="w-full px-2 md:px-6">
            <Contacto />
        </div>    

    </div>  
</div>

            </>
        )
};

export default Locations;

export const locationRoute = createRoute({
  getParentRoute: () => Route,
  path: '/location',
  loader: async () => {
    const res = await fetch('https://api.github.com') // Nota: Usa la API, github.com normal devuelve HTML y rompería el .json()
    if (!res.ok) throw new Error('Error al cargar los datos')
    return res.json()
  },
  component: Locations,
})