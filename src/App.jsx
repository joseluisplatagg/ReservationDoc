import React, { useState, useEffect } from "react";
import { Contact, Menu } from "lucide-react";
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import "aos/dist/aos.css"
import Home from './components/Home'
import Navbar from "./components/Navbar";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faEnvelope, faUserPen, faUserAstronaut,
  faTooth, faBullseye,faEye, faTrophy,faHospital, faClock,
faEarthAmericas, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'; // Import specific solid icons
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import specific brand icons
import Login from "./components/pages/Login/Login";

library.add(faEarthAmericas,faPhoneVolume,
  faHouse, faTrophy, faEnvelope,faUserPen,
  faClock, faHospital, faTooth, faTwitter, 
  faUserAstronaut, faBullseye, faEye, faFacebook); // Add icons to the library

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos para considerar los datos obsoletos
      cacheTime: 1000 * 60 * 10, // 10 minutos para eliminar los datos inactivos
    },
  },
});

function App() {
  useEffect(() =>{
    AOS.init({
      duration:800,
      once:true
    });
  },[])
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <Navbar/>
    <QueryClientProvider client={queryClient}>
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
    </QueryClientProvider>
    </>
  )
}

export default App
