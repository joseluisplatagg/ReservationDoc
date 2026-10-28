import { createFileRoute } from '@tanstack/react-router'
import ScheduleToday from '../../components/pages/Reservation/ScheduleToday'

export const Route = createFileRoute('/__public/scheduleToday')({
  component: ScheduleToday,
})