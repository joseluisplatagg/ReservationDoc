import { createFileRoute } from '@tanstack/react-router'
import ReservationDetail from '../../components/pages/Reservation/ReservationDetail'

export const Route = createFileRoute('/__public/reservationDetail')({
  validateSearch: (search) => {
    return {
      citaId: search.citaId,
    }
  },
  component: ReservationDetail,
})


