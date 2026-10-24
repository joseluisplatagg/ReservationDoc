import { createFileRoute, redirect } from '@tanstack/react-router'
import MainLayout  from '../components/layouts/MainLayout'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // -> HomePagePrincipal
    throw redirect({ to: '/home' })
    },
  component: MainLayout, 
})
