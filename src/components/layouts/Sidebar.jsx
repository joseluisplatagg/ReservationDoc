import React, { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoImg from '../../../public/logo.jpg'

export function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate()
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  
  // Estado para controlar qué dropdown está abierto de manera independiente
  const [openDropdowns, setOpenDropdowns] = useState({})

  const userRole = localStorage.getItem('user_role') || 'admin' 
  const userName = "Lic. María Elena"

  // 1. Definición de rutas por sección (Manteniendo emojis para remover en renderizado o usarlos si gustas)
  const menuPersonal = [
    { to: '/homePage', label: ' Inicio' },
    { to: '/scheduleToday', label: '🗂️ Agenda del Día' },
  ]

  const menuPacientes = [
    { to: '/home', label: '🏠 Inicio (Nombre usuario y calendario)' },
    { 
      label: '🗓️ Citas', 
      isDropdown: true,
      submenu: [
        { to: '/internal/reservation', label: '• Crear Cita' },
        { to: '/mis-citas', label: '• Próximas Citas' },
        { to: '/historial-citas', label: '• Historial' },
      ]
    },
    { to: '/calendar', label: '🏥 Configuración' },
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate({ to: '/' })
  }



  // Alternar el estado abierto/cerrado de un menú desplegable específico
  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  // Decidir qué menú renderizar según el rol
  const activeMenu = userRole === 'paciente' ? menuPacientes : menuPersonal

  // Función Limpiadora de texto (Remueve emojis, viñetas y espacios sobrantes)
  const cleanLabel = (label) => label.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ() ]/g, '').trim()

  // 2. Renderizador de enlaces con los estilos integrados de tu tarjeta flotante fucsia
  const renderLinks = (links) => links.map((link, index) => {
    // CASO A: Si el ítem es un submenú desplegable (Dropdown)
    if (link.isDropdown) {
      const isDropdownOpen = !!openDropdowns[link.label]
      
      return (
        <div key={index} className='flex flex-col w-full gap-1'>
          {/* Botón Padre en la Tarjeta Flotante */}
          <button
            type='button'
            onClick={() => toggleDropdown(link.label)}
            className='flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer text-left'
          >
            <div className="flex items-center gap-3">
              
              <span>{cleanLabel(link.label)}</span>
            </div>
            {/* Flecha indicadora con rotación animada */}
            <span className={`text-2xs text-fuchsia-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Submenú desplegable con transiciones */}
          {isDropdownOpen && (
            <div className='flex flex-col gap-1 pl-4 border-l border-fuchsia-500/30 ml-5 transition-all duration-300'>
              {link.submenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.to}
                  onClick={() => setIsOpen(false)} // Cierra el sidebar principal en móviles
                  className='flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer'
                  activeProps={{
                    className: 'bg-white/15 text-white font-bold border-l-4 border-fuchsia-400 pl-2'
                  }}
                >
                  
                  <span>{cleanLabel(subItem.label)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    // CASO B: Enlaces estándar normales
    return (
      <Link
        key={index}
        to={link.to}
        search={link.search} // Soporta parámetros query como { step: 1 } de TanStack
        onClick={() => setIsOpen(false)}
        className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer'
        activeProps={{
          className: 'bg-white/20 text-white font-bold border-l-4 border-fuchsia-400 pl-2 shadow-inner'
        }}
      >
        
        <span>{cleanLabel(link.label)}</span>
      </Link>
    )
  })

  return (
    <>
      {/* FONDO OSCURO EN MÓVILES */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CONTENEDOR DEL SIDEBAR */}
      <aside
  className={`fixed top-0 left-0 h-screen w-64 z-40 flex flex-col justify-between p-4 bg-white border-r border-gray-200 shadow-xl select-none transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
>
        <div>
          {/* 1. PARTE SUPERIOR: CABECERA */}
          <div className="flex items-center gap-3 pt-14 md:pt-2 pb-4 px-2 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-fuchsia-900 text-white flex items-center justify-center font-black shadow-sm overflow-hidden">
              <img  
                src={logoImg}  
                alt="Logotipo" 
                className="h-9 w-auto object-contain transition-transform duration-200" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-800 tracking-wide text-sm leading-none">
                Dr. F. Astudillo
              </span>
              <span className="text-3xs font-bold text-fuchsia-900 uppercase tracking-widest mt-1">
                Ginecólogo
              </span>
            </div>
          </div>

          {/* 2. PARTE CENTRAL: EL MENÚ CON DEGRADADO FUCSIA (Usa la función unificada) */}
          <div className="my-4 p-4 rounded-2xl bg-linear-to-b from-fuchsia-950 via-fuchsia-900 to-purple-950 text-white shadow-inner flex flex-col gap-2 max-h-[calc(100vh-180px)] overflow-y-auto">
            <span className="text-3xs font-bold text-fuchsia-300/80 uppercase tracking-widest px-2 mb-2">
              Navegación ({userRole})
            </span>
            
            <nav className="flex flex-col gap-1.5">
              {renderLinks(activeMenu)}
            </nav>
          </div>
        </div>

        {/* 3. PARTE INFERIOR: USUARIO Y BOTÓN DE LOGOUT */}
<div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
  {/* Tarjeta de Información del Usuario */}
  <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-gray-50/80">
    {/* Icono/Avatar con la Inicial */}
    <div className="w-9 h-9 rounded-full bg-fuchsia-900 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shrink-0">
      {userName.replace("Lic. ", "").charAt(0).toUpperCase()}
    </div>
    
    {/* Nombre del Usuario y Rol en Texto */}
    <div className="flex flex-col min-w-0">
      <span className="font-bold text-gray-700 text-xs truncate leading-tight">
        {userName}
      </span>
      <span className="text-4xs font-medium text-gray-400 uppercase tracking-wider mt-0.5">
        {userRole === 'admin' ? 'Administrador' : userRole}
      </span>
    </div>
  </div>

  {/* Botón de Cerrar Sesión de forma elegante */}
  <button
    type="button"
    onClick={handleLogout}
    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group"
        >
          
          <span>Cerrar Sesión</span>
        </button>
      </div>
      </aside>
    </>
  )
}

