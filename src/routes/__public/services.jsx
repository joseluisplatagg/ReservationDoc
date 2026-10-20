import { createFileRoute } from '@tanstack/react-router'
import Services from '../../components/pages/LandingPage/Services'

export const Route = createFileRoute('/__public/services')({
  loader: async () => {
    const res = await fetch('https://api.github.com') 
    if (!res.ok) throw new Error('Error al cargar los datos')
    return res.json()
  },
  component: Services,
})
