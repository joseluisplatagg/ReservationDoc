import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { createRoute } from '@tanstack/react-router'
import { Route } from '../../../routes/__root'

const SocialMedia = ()  => {
    const redes = [
    {
      id: 1,
      nombre: "Facebook",
      usuario: "/Dr.FernandoAstudillo",
      descripcion: "Entérate de nuestros servicios disponibles y promociones",
      color: "bg-[#1877F2] text-white",
      hover: "hover:shadow-[#1877F2]/30",
      link: "https://facebook.com/Dr.FernandoAstudillo",
      icon: faFacebook
    },
    {
      id: 2,
      nombre: "Instagram",
      usuario: "@dr.fernandoastudillo",
      descripcion: "Biblioteca digital para exponer nuestra excelencia y cálidad",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
      hover: "hover:shadow-[#ee2a7b]/30",
      link: "https://www.instagram.com/dr.fernandoastudillo",
      icon: faInstagram
    },
    {
      id: 3,
      nombre: "WhatsApp Business",
      usuario: "¡Haz tu Pedido!",
      descripcion: "Escríbenos directo para realizar una cotización",
      color: "bg-[#25D366] text-white",
      hover: "hover:shadow-[#25D366]/30",
      link: "https://wa.me", // Pon aquí tu enlace de WhatsApp
      icon: faWhatsapp
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-5 py-12 text-center">
      {/* Encabezado de la sección */}
      <div className="mb-10">
        <span className="text-fg-purple font-bold text-sm uppercase tracking-widest bg-amber-100 dark:bg-fuchsia-950/40 px-3 py-1 rounded-full">
          Comunidad
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-fuchsia-900/70  mt-3 mb-4">
          ¡Síguenos en nuestras Redes!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium max-w-xl mx-auto text-base md:text-lg">
          Estamos para servirte y darte la mejor atención en cálidad y servicio.
        </p>
      </div>

      {/* Grid de 3 columnas responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {redes.map((red) => (
          <a
            key={red.id}
            href={red.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center p-6 bg-zinc-900 text-white dark:bg-fuchsia-900 dark:text-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${red.hover}`}
          >
            {/* Círculo con el Icono de la Red Social */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 shadow-md ${red.color}`}>
              <FontAwesomeIcon icon={red.icon} />
            </div>

            {/* Información */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {red.nombre}
            </h4>
            <span className="text-brand font-bold text-sm font-sans mb-3 block">
              {red.usuario}
            </span>
            <p className="text-gray-200 dark:text-gray-100 text-sm leading-relaxed font-medium">
              {red.descripcion}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
} 

export default SocialMedia;

