import { createFileRoute } from '@tanstack/react-router'
import Locations from '../../components/pages/LandingPage/Locations'

export const Route = createFileRoute('/__public/locations')({
  loader: async () => {
    const res = await fetch('https://api.github.com') 
    if (!res.ok) throw new Error('Error al cargar los datos')
    return res.json()
  },
  component: Locations,
})

