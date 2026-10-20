import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState(null);
  const { addToCart } = useCart();
  // Simulación: Simulamos que el producto termina de cargar en 1.5 segundos
  // Aquí es donde después conectarás tu fetch() real a tu base de datos o API
  useEffect(() => {
    const timer = setTimeout(() => {
      // 3. Simulamos los datos basados en el ID real que viene de la URL
      // En el futuro, aquí harás: fetch(`/api/productos/${id}`)
      const detalleSimulado = {
        id: id,
        nombre: id === "1" ? "Tamal Verde" : id === "2" ? "Tamal de Dulce" : "Bebida Especial de la Casa",
        precio: id === "3" ? 30 : 35,
        categoria: id === "3" ? "Bebidas" : "Tradicionales",
        descripcion: "Preparado con los mejores ingredientes tradicionales, masa suave y sazón de calidad de Tamales Beto.",
        imagen: id === "1" ? "/tamalesTradicionales.jpg" : id === "2" ? "/tamalesOaxaqueños.jpg" : "/atoles.jpg",
        sku: `TAM-DET-0${id}`,
        modelo: id === "3" ? "Atole" : "Tamal",
        stock: 12
      };

      setProducto(detalleSimulado);
      setLoading(false);
    }, 1500); // Mantenemos tu simulación de carga de 1.5 segundos

    return () => clearTimeout(timer);
  }, [id]);


  return (
    <>
       <div className="bg-gray-50 dark:bg-white min-h-screen pt-20 pb-12">  
      
      <section className="py-8 md:py-16" id="productContainer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ====================================== */}
          {/* CONDICIONAL: ESTADO DE CARGA           */}
          {/* ====================================== */}
          {loading ? (
          /* ========================================================================= */
          /* SKELETON LOADER: Se muestra mientras la simulación de 1.5s está activa    */
          /* ========================================================================= */
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm" id="loadingState">
            <div role="status" className="inline-block">
              <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://w3.org">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5918 10.4985 44.065 10.084C47.8507 9.45226 51.7146 9.53406 55.4971 10.3242C60.8719 11.4504 65.9863 13.7431 70.3533 17.067C74.7203 20.391 78.2913 24.6111 80.8177 29.5306C83.0309 33.8615 84.6975 38.5259 85.7465 43.3565C86.3659 46.2081 88.89 48.0666 91.6613 47.4294Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Cargando...</span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">Preparando los mejores tamales...</p>
          </div>
        ) : (
            /* Si loading es false, renderizamos la rejilla del contenido sin usar estilos en línea ocultos */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8" id="productContent">
              
               {/* COLUMNA IZQUIERDA: Imagen y Galería Dinámicas */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden aspect-square flex items-center justify-center p-4 group">
                  {/* 🛠️ IMAGEN DINÁMICA: Lee la foto del tamal correspondiente de tu carpeta public/ */}
                  <img 
                    id="productImage" 
                    src={producto?.imagen || "/atoles.jpg"} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
                    alt={producto?.nombre} 
                  />
                </div>
                
                <div id="productGallery" className="grid grid-cols-4 gap-3">
                  <div className="aspect-square bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 rounded-xl overflow-hidden p-1 cursor-pointer">
                    <img src={producto?.imagen || "/atoles.jpg"} className="w-full h-full object-cover rounded-lg" alt="Miniatura" />
                  </div>
                </div>
              </div>

              {/* Aquí colocaremos la Columna Derecha en el siguiente bloque */}
              {/* ====================================== */}
              {/* COLUMNA DERECHA: Información y Venta   */}
              {/* ====================================== */}
              <div className="flex flex-col">
                
                {/* Badge de Categoría Dinámica */}
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-900/40 dark:text-blue-700 uppercase tracking-wider" id="productBrand">
                  {producto?.categoria || "Especiales"}
                </span>
              </div>
              
              {/* Título del Producto Dinámico */}
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-blue-700 sm:text-3xl mb-2" id="productTitle">
                {producto?.nombre}
              </h1>

              {/* Descripción Dinámica */}
              <p className="text-sm text-gray-600 dark:text-black leading-relaxed mb-4">
                {producto?.descripcion}
              </p>
              
              {/* Precio Dinámico */}
              <div className="flex items-baseline gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-500" id="productPrice">
                  ${producto?.precio}.00
                </span>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  MXN
                </span>
              </div>
                        
                        {/* Disponibilidad y Stock Dinámicos */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-black" id="productAvailability">
                    Disponible
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-blue-700" id="productStock">
                  {producto?.stock || 12} unidades en almacén hoy
                </p>
              </div>

              {/* SKU y Modelo Dinámicos en Rejilla */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl shadow-xs">
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">Código (SKU)</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white font-mono" id="productSKU">
                    {producto?.sku}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl shadow-xs">
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">Modelo</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white font-mono" id="productModel">
                    {producto?.modelo || "Tradicional"}
                  </div>
                </div>
              </div>

                    {/* Sección de Compra e Interactividad */}
        <div className="mb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Cantidad:
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Contador estilo cápsula Flowbite con lógica enlazada */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 h-12 px-2 justify-between sm:justify-start max-w-full sm:max-w-[140px]">
              <button 
                type="button" 
                id="decreaseQty" 
                // 🛠️ Restamos 1 solo si es mayor que 1 para no tener cantidades inválidas
                onClick={() => setCantidad((prev) => (prev > 1 ? prev - 1 : 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                <i className="bi bi-dash font-bold"></i>
              </button>
              
              <input 
                type="number" 
                id="quantity" 
                value={cantidad} // Vinculado a React
                // Permite escribir el número directamente con el teclado
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCantidad(val >= 1 ? val : 1);
                }}
                className="w-12 text-center bg-transparent border-0 font-semibold text-sm text-gray-900 dark:text-white focus:ring-0" 
                min="1" 
              />
              
              <button 
                type="button" 
                id="increaseQty" 
                // 🛠️ Sumamos 1 a la cantidad actual
                onClick={() => setCantidad((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                <i className="bi bi-plus font-bold"></i>
              </button>
            </div>
            
            {/* Botón de Añadir al Carrito Principal conectado al Contexto Global */}
            <button 
              id="addToCartBtn" 
              onClick={() => {
                // Ejecutamos tu función global pasándole el producto dinámico y multiplicándolo por la cantidad elegida
                // Modificaremos levemente la lógica para mandar la cantidad exacta seleccionada
                for (let i = 0; i < cantidad; i++) {
                  addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
                }
                alert(`¡Se agregaron ${cantidad} unidad(es) de ${producto.nombre} al carrito!`);
              }}
              className="grow inline-flex h-12 items-center justify-center rounded-xl bg-blue-700 px-6 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 transition shadow-md shadow-blue-500/10 cursor-pointer"
            >
              <i className="bi bi-cart-plus me-2 text-base"></i>
              Agregar al Carrito
            </button>
          </div>
        </div>

        {/* Beneficios oficiales / Franja de Confianza (Manteniendo tus bonitos iconos) */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="bi bi-shield-check text-base"></i>
            </div>
            <span className="font-medium">Garantía oficial de satisfacción total</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="bi bi-truck text-base"></i>
            </div>
            <span className="font-medium">Preparación higiénica y envío inmediato local</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="bi bi-credit-card text-base"></i>
            </div>
            <span className="font-medium">Pagos seguros encriptados</span>
          </div>
        </div>    

              </div>

            </div>
          )}

        </div>
      </section>
    </div>
    </>
  );
}

