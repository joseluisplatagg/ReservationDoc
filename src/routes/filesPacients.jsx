import { createFileRoute } from '@tanstack/react-router'
import { FilesPacients } from '../components/pages/Settings/filesPacients'
import { useState, useEffect } from 'react';
import { loginUser } from '../api/auth';
import MainLayout from '../components/layouts/MainLayout'
import UserLayout from '../components/layouts/UserLayout'

export const Route = createFileRoute('/filesPacients')({
  component: filesPacientsRoute,
})

function filesPacientsRoute() {
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
      <FilesPacients />
    </UserLayout>
  ) : (
    <MainLayout>
      <FilesPacients />
    </MainLayout>
  )
}