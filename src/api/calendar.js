import { apiClient } from "./apiClient";

export const crearCita = async ( cita ) => {
console.log("daataaaaa",cita)


  const response = await apiClient.post('/crear-cita', cita,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
    
    if (response == null ) {
      //console.log("daataaaaa",response)
      // Maneja los errores de la API, por ejemplo, credenciales incorrectas
      return 0;
    }  else return response;
};

export const listarCitas = async () => {
  const response = await apiClient.get('/obtener-citas',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
    
    console.log("res",response);
    if (response == null ) {
      // Maneja los errores de la API, por ejemplo, credenciales incorrectas
      return 0;
    }  else return response;
};