import React, {useState} from 'react';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faUsersViewfinder, faStaffSnake, faPaperPlane
  , faArrowRightToBracket,  faCalendarCheck,
  faCalendarAlt
  } from '@fortawesome/free-solid-svg-icons';
import logoImg from '../../../public/logo.jpg'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 left-0 border-b shadow-blue-100 shadow-2xl border-default">
            <div className="max-w-7xl flex items-center justify-between mx-auto p-4 px-5">
              
              {/* LOGOTIPO */}
              {/* Contenedor principal que agrupa la imagen y los textos alineados horizontalmente */}
              <div className="flex items-center gap-3 group"> 
                <img  
                  src={logoImg} 
                  alt="Logotipo" 
                  className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-110" 
                />
                <div className="flex flex-col">
                  <span className="font-black text-gray-900 tracking-wide text-base leading-none mt-1">
                    Dr. Fernando Astudillo
                  </span>
                  <span className="text-2xs font-bold text-fuchsia-900 uppercase tracking-widest mt-1.5">
                    Ginecólogo Obstetra
                  </span>
                </div>
              </div>

      
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
                  
                  <Link to="/home" activeProps={{ className: 'block py-2 px-3 text-brand font-bold md:p-0' }}>
                      <div className="text-center">
                        <FontAwesomeIcon icon={faHouseChimney} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Inicio
                  </Link>
                  
                  <Link to="/aboutus" activeProps={{ className: 'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0' }}>
                      <div className="text-center">
                            <FontAwesomeIcon icon={faUsersViewfinder} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Nosotros
                  </Link>

                  <Link to="/services" activeProps={{ className: 'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0' }}>
                    <div className="text-center">
                            <FontAwesomeIcon icon={faStaffSnake} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Servicios
                  </Link>

                  <Link to="/locations" activeProps={{ className: 'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0' }}>
                    <div className="text-center">
                            <FontAwesomeIcon icon={faPaperPlane} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Contacto
                  </Link>
                  
                  <Link to="/reservation" activeProps={{ className: 'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0' }}>
                    <div className="text-center">
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Reserva
                  </Link>

                  {/* <Link to="/scheduleToday" activeProps={{ className: 'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0' }}>
                    <div className="text-center ">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-xl text-fuchsia-900 dark:text-fuchsia-800 font-extrabold" />
                      </div>
                    Citas Actuales
                  </Link>  */}
                </ul>
              </div>
      
            </div>
          </nav>
    </header>
  );
};

export default Header;