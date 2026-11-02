import { createFileRoute } from '@tanstack/react-router'
import ReservationDetail from '../../components/pages/Reservation/ReservationDetail'

export const Route = createFileRoute('/__public/reservationDetail')({
  component: ReservationDetail,
})


