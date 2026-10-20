
import React, { useState, useEffect  } from 'react';

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [soloStock, setSoloStock] = useState(true);
  // 2. Cada vez que cambie la categoría, el precio mínimo o el máximo, el useEffect se dispara automáticamente
  useEffect(() => {
    // Construimos la URL dinámica usando Query Params
    let url = '/api/products?';
    
    if (categoriaSeleccionada !== "Todas") {
      url += `categoria=${categoriaSeleccionada}&`;
    }
    if (priceMin) {
      url += `min=${priceMin}&`;
    }
    if (priceMax) {
      url += `max=${priceMax}&`;
    }

    // Hacemos la petición con los filtros aplicados
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al filtrar les:", err));

  }, [categoriaSeleccionada, priceMin, priceMax]);
  return (
    <section className="py-12 bg-gray-50 dark:bg-white transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-black mb-10">
          Nuestro Menú de Calidad
        </h2>
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Filtros</h5>
                
                {/* Categories Filter */}
                <div className="mb-6">
                  <h6 className="text-sm font-semibold text-gray-900 dark:text-black mb-4 tracking-wide uppercase">
                    Categorías
                  </h6>
                  
                  <div className="space-y-3">
                    {/* Opción: Todas */}
                    <div className="flex items-center">
                      <input 
                        id="catTodas" 
                        type="radio" // Cambiado a radio para que sea una sola selección a la vez
                        name="categoria"
                        checked={categoriaSeleccionada === "Todas"}
                        onChange={() => setCategoriaSeleccionada("Todas")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="catTodas" className="ms-3 text-sm font-medium text-gray-900 cursor-pointer select-none">
                        Todas las categorías
                      </label>
                    </div>

                    {/* Separador */}
                    <div className="relative flex py-2 items-center">
                      <div className="grow border-t border-gray-200"></div>
                      <span className="shrink mx-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Principales</span>
                      <div className="grow border-t border-gray-200"></div>
                    </div>

                    {/* Categoría: Bebidas */}
                    <label 
                      htmlFor="catBebidas" 
                      className={`flex items-center justify-between p-3 w-full border rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${categoriaSeleccionada === "Bebidas" ? "border-blue-600 bg-blue-50/50" : "bg-white border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <i className="bi bi-cup-hot fs-5"></i> {/* Cambié el icono de cámara por una taza */}
                        </div>
                        <span className="text-sm font-medium text-gray-900">Bebidas</span>
                      </div>
                      <input 
                        id="catBebidas" 
                        type="radio" 
                        name="categoria"
                        checked={categoriaSeleccionada === "Bebidas"}
                        onChange={() => setCategoriaSeleccionada("Bebidas")}
                        className="w-4 h-4 text-blue-600 cursor-pointer" 
                      />
                    </label>

                    {/* Categoría: Tradicionales */}
                    <label 
                      htmlFor="catTradicionales" 
                      className={`flex items-center justify-between p-3 w-full border rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${categoriaSeleccionada === "Tradicionales" ? "border-blue-600 bg-blue-50/50" : "bg-white border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                          <i className="bi bi-egg-fried fs-5"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Tradicionales</span>
                      </div>
                      <input 
                        id="catTradicionales" 
                        type="radio" 
                        name="categoria"
                        checked={categoriaSeleccionada === "Tradicionales"}
                        onChange={() => setCategoriaSeleccionada("Tradicionales")}
                        className="w-4 h-4 text-blue-600 cursor-pointer" 
                      />
                    </label>
                  </div>
                </div>

                {/* Rango de Precio Filter */}
                <div className="mb-6">
                  <h6 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                    Rango de Precio
                  </h6>
                  <div className="space-y-3">
                    {/* Input Mínimo */}
                    <div>
                      <label htmlFor="priceMin" className="block mb-1.5 text-xs font-medium text-gray-500">Mínimo</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none text-gray-400 text-sm">$</div>
                        <input 
                          type="number" 
                          id="priceMin" 
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)} // Vinculamos el teclado al estado
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-7 p-2" 
                          placeholder="0" 
                        />
                      </div>
                    </div>

                    {/* Input Máximo */}
                    <div>
                      <label htmlFor="priceMax" className="block mb-1.5 text-xs font-medium text-gray-500">Máximo</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none text-gray-400 text-sm">$</div>
                        <input 
                          type="number" 
                          id="priceMax" 
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)} // Vinculamos el teclado al estado
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-7 p-2" 
                          placeholder="100" 
                        />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Stock Filter (Transformado a un Toggle Switch de Flowbite) */}
                <div className="mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h6 className="text-sm font-semibold text-gray-900 dark:text-black mb-3 tracking-wide uppercase">
                    Disponibilidad
                  </h6>
                  <label className="inline-flex items-center justify-between w-full cursor-pointer select-none">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Solo en Stock</span>
                    <input 
                      type="checkbox" 
                      id="inStock" 
                      checked={soloStock} // Conectado a React
                      onChange={(e) => setSoloStock(e.target.checked)} // Escucha el switch
                      className="sr-only peer" 
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none focus:ring-2 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Clear Filters */}
                <div className="pt-2">
                  <button 
                    id="clearFilters" 
                    onClick={() => {
                      
                      setCategoriaSeleccionada("Todas");
                      setPriceMin("");
                      setPriceMax("");
                      setSoloStock(false);
                    }}
                    className="py-2.5 px-4 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  >
                    <i className="bi bi-x-circle fs-6"></i>
                    Limpiar Filtros
                  </button>
                </div>


              </div>
            </div>
          </div>

           {/* Products Grid */}
            {/* Si loading es verdadero muestra el spinner, si es falso pinta los productos reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="productsGrid">
              
              {/* ESTADO DE CARGA AUTOMÁTICO */}
              {/* Cambiaremos esto más adelante con tu estado real {loading ? (...) : (...)} */}
              {/* Por ahora te dejo la estructura de cómo se acopla la tarjeta dentro del Grid: */}

             {/* 3. ¡AQUÍ ESTÁ EL MAP! Recorre cada producto que llegó de la API y dibuja su tarjeta */}
          {productos.map((producto) => (
            
            <Link 
              key={producto.id} // 💡 Clave única obligatoria para React
              href={`/product/${producto.id}`} 
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              {/* Contenedor de la Imagen */}
              <div className="relative bg-gray-50 dark:bg-gray-700 aspect-square flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 z-10 shadow-xs">
                  Popular
                </span>
                
                <img 
                  src={producto.imagen || "/atoles.jpg"} // Imagen dinámica o una por defecto
                  alt={producto.nombre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Detalles del Producto */}
              <div className="p-4 flex flex-col grow">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                  {producto.descripcion || "Bebidas"}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 min-h-10">
                  {producto.nombre}
                </h3>
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                  Mod: <span className="font-mono">{producto.sku || "BEB-ESP-01"}</span>
                </div>

                {/* Precio y Botón de Compra alineados al fondo */}
                <div className="mt-auto pt-3 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block">Precio</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      ${producto.precio}.00
                    </span>
                  </div>
                  
                  {/* Botón de acción rápido protegido para que no interfiera con el Link */}
                  <div 
                    role="button"
                    onClick={(e) => {
                      e.preventDefault(); // Detiene la redirección del enlace externo
                      addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
                    }}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors cursor-pointer z-20"
                  >
                    ¡Pedir!
                  </div>
                </div>
              </div>
            </Link>

          ))}
 

            </div>
        </div>
      </div>
    </section>
  );
}
