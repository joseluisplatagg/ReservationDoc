import { createFileRoute } from '@tanstack/react-router'
import ReservarContainer from '../../components/pages/Reservation/Reservation'

export const Route = createFileRoute('/__public/reservation')({

  component: ReservarContainer, 
})

