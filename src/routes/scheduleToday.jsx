import { createFileRoute } from '@tanstack/react-router'
import ScheduleToday from '../components/pages/Reservation/ScheduleToday'
import MainLayout from '../components/layouts/MainLayout'
import UserLayout from '../components/layouts/UserLayout'
import { useEffect, useState } from 'react';
import { loginUser } from '../api/auth';

export const Route = createFileRoute('/scheduleToday')({
  component: ScheduleTodayRoute,
})

function ScheduleTodayRoute() {
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
      <ScheduleToday />
    </UserLayout>
  ) : (
    <MainLayout>
      <ScheduleToday />
    </MainLayout>
  )
}