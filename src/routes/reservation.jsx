import { createFileRoute } from '@tanstack/react-router'
import ReservarContainer from '../components/pages/Reservation/Reservation'
import MainLayout from '../components/layouts/MainLayout'
import UserLayout from '../components/layouts/UserLayout'
import { loginUser } from '../api/auth';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/reservation')({
  component: ReservationRoute, 
})

function ReservationRoute() {
  const [ isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() =>{
    loginUser().then((isAuth) => {
    setIsAuthenticate(isAuth)
    });
  },[])

  
  if (isAuthenticate === null || isAuthenticate === false) {
    return <div>Cargando verificación...</div> 
  }
    
  // Reutilizas el mismo componente <ReservationComponent />, 
  // pero lo envuelves en el template que corresponda:
  return isAuthenticate ? (
    <UserLayout>
      <ReservarContainer />
    </UserLayout>
  ) : (
    <MainLayout>
      <ReservarContainer />
    </MainLayout>
  )
}


