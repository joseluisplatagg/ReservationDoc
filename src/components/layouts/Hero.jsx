// ui elements
import Title from "./Title";
import ImgLogo from "../../../public/logo.jpg"

export default function Hero({ title, image, className = "" }) {
  return (
    <div className="relative w-full min-h-[440px] flex flex-col items-center justify-center px-4 py-20 overflow-hidden 
    bg-linear-to-r from-fuchsia-800 via-purple-900 to-blue-950 text-white select-none ">
  
    {/* Efecto de manchas de luz orgánicas del fondo */}
    <div 
      className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen"
      style={{
        backgroundImage: `radial-gradient(circle at 15% 45%, rgba(217, 70, 239, 0.55) 0%, transparent 50%), radial-gradient(circle at 85% 35%, rgba(37, 99, 235, 0.45) 0%, transparent 55%)`
      }}
    />

    {/* Contenedor central */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      
      {/* Iconos / Emblemas superiores */}
      <div className="flex items-center justify-center gap-5 mb-8 opacity-95">
        {/* Letra F estilizada o SVG del logo */}
        {/* <span className="font-serif text-3xl sm:text-4xl font-light text-white tracking-widest drop-shadow-sm">
          F
        </span> */}
        {/* Emblema circular secundario */}
        <div className="w-29 h-29 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-black shadow-sm overflow-hidden">
          <img  
            src={ImgLogo} 
            alt="Logotipo" 
            className="h-29 w-29 object-contain transition-transform duration-200 group-hover:scale-110" 
          />
        </div> 
      </div>

      {/* TÍTULO PRINCIPAL (Serif elegante con peso normal/ligero) */}
      <h1 className="font-serif italic md:not-italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-normal text-white drop-shadow-md leading-[1.15]">
        {title || "Actualización"}
      </h1>

      {/* SUBTÍTULO (Sans-serif liviano con tracking amplio) */}
      <p className="mt-4 text-xs sm:text-sm md:text-base font-light tracking-[0.18em] uppercase text-white/95 max-w-2xl px-2">
      Especialista en cirugía ginecológica de mínima invasión
      </p>

    </div>
  </div>

  );
}
