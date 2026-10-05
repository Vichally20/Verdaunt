import { useState } from 'react'
import { Logo } from './Logo'
import { homeHref } from '../lib/links'
import { useWaitlist } from './Waitlist'

const links = [
  { label: 'How it works', hash: '#workflow' },
  { label: 'Features', hash: '#features' },
]

export function SiteHeader() {
  const { openWaitlist } = useWaitlist()
  const [menuOpen, setMenuOpen] = useState(false)

  function go(hash: string) {
    setMenuOpen(false)
    window.location.href = homeHref(hash)
  }

  return (
    <header className="sticky top-0 z-40 bg-night text-mist">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <a href={homeHref()} className="flex items-center gap-2.5" aria-label="Verdaunt home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-night">
            <Logo />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">Verdaunt</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.hash} href={homeHref(link.hash)} className="text-sm text-white/70 hover:text-white">
              {link.label}
            </a>
          ))}
          <button type="button" onClick={openWaitlist} className="text-sm text-white/70 hover:text-white">
            Pricing
          </button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button type="button" onClick={openWaitlist} className="px-3 py-2 text-sm text-white/70 hover:text-white">
            Log in
          </button>
          <button
            type="button"
            onClick={openWaitlist}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-night"
          >
            Get started
          </button>
        </div>

        <button
          type="button"
          className="rounded-full bg-white/10 px-4 py-2 text-sm text-white md:hidden"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <button key={link.hash} type="button" onClick={() => go(link.hash)} className="text-left text-sm text-white">
                {link.label}
              </button>
            ))}
            <button type="button" onClick={openWaitlist} className="text-left text-sm text-white">
              Pricing
            </button>
            <button type="button" onClick={openWaitlist} className="mt-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-night">
              Get started
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
