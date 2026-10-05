import { useEffect, useState, type ReactNode } from 'react'
import { useInView, usePrefersReducedMotion } from '../lib/useInView'

export function DmThread() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.45)
  const [cycle, setCycle] = useState(0)
  const [beat, setBeat] = useState(reduced ? 3 : -1)

  useEffect(() => {
    if (reduced) {
      setBeat(3)
      return
    }
    if (!inView) return

    setBeat(-1)
    const timers = [500, 1800, 3400, 5000].map((delay, index) =>
      window.setTimeout(() => setBeat(index), delay),
    )
    const loop = window.setTimeout(() => setCycle((value) => value + 1), 9000)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(loop)
    }
  }, [inView, cycle, reduced])

  return (
    <div ref={ref} className="mx-auto w-full max-w-[340px]">
      <div className="border border-night bg-night p-3 text-paper shadow-xl">
        <div className="mb-3 flex items-center justify-between px-1 text-xs text-sand">
          <span>Verdaunt Bot</span>
          <span className="text-lime">Active</span>
        </div>
        <div className="relative min-h-72 space-y-3 bg-[#2a241f] p-3">
          {beat >= 0 ? <Bubble side="them">Do you have this in black? And how much to deliver to Lekki?</Bubble> : null}
          {beat >= 1 ? (
            <Bubble side="us">
              <p>Yes, we have 2 left in stock. Delivery to Lekki is ₦3,000.</p>
              <div className="mt-3 border border-white/15 px-3 py-2 text-center">
                <p className="font-display text-lg text-sand">₦48,000 total</p>
                <p className="text-[10px] tracking-[0.16em] text-sand/70 uppercase">Tap to pay</p>
              </div>
            </Bubble>
          ) : null}
          {beat >= 2 ? (
            <div className="rise border border-white/10 bg-night px-3 py-2 text-xs">
              <p className="text-[10px] tracking-wide text-sand uppercase">GTBank · just now</p>
              <p className="mt-1">₦48,000 received from Sarah J.</p>
            </div>
          ) : null}
          {beat >= 3 ? (
            <Bubble side="us">
              <p className="text-sand">Payment received.</p>
              <p className="mt-1">Here is your finalized receipt. Your order is now being processed.</p>
              <p className="mt-3 border border-white/15 px-3 py-2 text-[11px]">Receipt_#1042.pdf · Verified</p>
            </Bubble>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Bubble({ side, children }: { side: 'them' | 'us'; children: ReactNode }) {
  return (
    <div className={`rise flex ${side === 'us' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] px-3 py-2 text-xs leading-relaxed ${
          side === 'us' ? 'bg-lime text-night' : 'bg-white/10 text-mist'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
