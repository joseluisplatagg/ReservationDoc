import { createFileRoute } from '@tanstack/react-router'
import SocialMedia from '../../components/pages/LandingPage/SocialMedia'

export const Route = createFileRoute('/__public/socialMedia')({
  loader: async () => {
    const res = await fetch('https://api.github.com') 
    if (!res.ok) throw new Error('Error al cargar los datos')
    return res.json()
  },
  component: SocialMedia,
})