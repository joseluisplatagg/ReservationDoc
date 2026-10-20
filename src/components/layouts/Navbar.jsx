import React, { useState } from 'react';
import logoImg from './../../public/logo.jpg'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 left-0 border-b shadow-blue-100 shadow-2xl border-default">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4 px-5">
        
        {/* LOGOTIPO */}
        <a href="/" className="flex items-center space-x-3">
        <img  
          src={logoImg} 
          alt="Logotipo" 
          className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
        />
          <span className="self-center text-xl text-brand font-extrabold whitespace-nowrap">
            
          </span>
        </a>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button 
          onClick={toggleMenu} 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" 
          aria-controls="navbar-default" 
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>

        {/* MENÚ DE ENLACES */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto absolute md:relative top-16 md:top-0 left-0 bg-neutral-primary md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none border-b md:border-none border-default`} id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 mt-0 border-0">
            <li>
              <a href="/" className="block py-2 px-3 text-brand font-bold md:p-0" aria-current="page">Inicio</a>
            </li>
            <li>
              <a href="/#about" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Acerca de Nosotros</a>
            </li>
            <li>
              <a href="/#services" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Servicios</a>
            </li>
            <li>
              <a href="/#location" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Contacto</a>
            </li>
            <li>
              <a href="/internal/reservation" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Reservación</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
