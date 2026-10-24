import { createFileRoute, redirect } from '@tanstack/react-router'
import MainLayout  from '../components/layouts/MainLayout'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    // -> HomePagePrincipal
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: MainLayout, 
})
