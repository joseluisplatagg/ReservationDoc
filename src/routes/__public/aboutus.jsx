import { createFileRoute } from '@tanstack/react-router'
import Aboutus from '../../components/pages/LandingPage/Aboutus'

export const Route = createFileRoute('/__public/aboutus')({
  loader: async () => {
    const res = await fetch('https://api.github.com') 
    if (!res.ok) throw new Error('Error al cargar los datos')
    return res.json()
  },
  component: Aboutus,
})
