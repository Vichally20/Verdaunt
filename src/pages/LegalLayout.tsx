import type { ReactNode } from 'react'
import { AppShell } from '../components/AppShell'

export function LegalLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-5xl">{title}</h1>
        <p className="mt-4 text-muted">Effective Date: October 2026</p>
        <div className="mt-10 space-y-8 text-muted leading-relaxed">{children}</div>
      </main>
    </AppShell>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  )
}
