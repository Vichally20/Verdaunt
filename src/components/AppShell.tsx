import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { WaitlistProvider } from './Waitlist'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WaitlistProvider>
      <SiteHeader />
      {children}
      <SiteFooter />
    </WaitlistProvider>
  )
}
