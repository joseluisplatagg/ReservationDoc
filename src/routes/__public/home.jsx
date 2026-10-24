import { createFileRoute } from '@tanstack/react-router'
import Home from '../../components/pages/LandingPage/Home'
export const Route = createFileRoute('/__public/home')({
  component: Home,
})