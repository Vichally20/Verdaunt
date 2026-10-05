import { useEffect, useState } from 'react'
import { naira } from '../lib/links'
import { useInView, usePrefersReducedMotion } from '../lib/useInView'

const transfers = [
  { id: 't0', amount: 45000, bank: 'GTBank', name: 'A. Okeke', order: '#1042' },
  { id: 't1', amount: 12500, bank: 'Access', name: 'B. Johnson', order: '#1043' },
  { id: 't2', amount: 89000, bank: 'Zenith', name: 'C. Davis', order: '#1044' },
  { id: 't3', amount: 3200, bank: 'Kuda', name: 'D. Smith', order: '#1045' },
  { id: 't4', amount: 15000, bank: 'Opay', name: 'E. Wilson', order: '#1046' },
  { id: 't5', amount: 7500, bank: 'Fidelity', name: 'Unknown', order: null },
]

const STEP_MS = 700

export function Ledger({ compact = false }: { compact?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(compact ? 0.2 : 0.4)
  const [cycle, setCycle] = useState(0)
  const [step, setStep] = useState(reduced ? transfers.length : 0)

  useEffect(() => {
    if (reduced) {
      setStep(transfers.length)
      return
    }
    if (!inView) return

    setStep(0)
    const timers = transfers.map((_, index) =>
      window.setTimeout(() => setStep(index + 1), (index + 1) * STEP_MS),
    )
    const loop = window.setTimeout(() => setCycle((value) => value + 1), transfers.length * STEP_MS + 2200)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(loop)
    }
  }, [inView, cycle, reduced])

  const matched = Math.min(step, 5)
  const volume = transfers.slice(0, matched).reduce((sum, transfer) => sum + transfer.amount, 0)

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
      <div className="flex items-end justify-between border-b border-line px-5 py-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Live ledger</p>
          <p className="mt-1 font-display text-2xl">{naira(volume)}</p>
        </div>
        <p className="font-mono text-xs text-muted">
          Matched <span className="text-night">{matched}</span>/5
        </p>
      </div>
      <ul>
        {step === 0 ? <li className="px-5 py-8 text-sm text-muted">Waiting on the bank switch.</li> : null}
        {transfers.map((transfer, index) => {
          if (step <= index) return null
          const needsReview = transfer.order === null
          return (
            <li
              key={transfer.id}
              className="rise grid grid-cols-[1fr_auto] gap-3 border-b border-line px-5 py-3 last:border-b-0"
            >
              <div>
                <p className="text-sm">
                  {transfer.bank}
                  <span className="text-muted"> · {transfer.name}</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {needsReview ? 'No invoice match' : `Paired with order ${transfer.order}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm">{naira(transfer.amount)}</p>
                <p
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
                    needsReview ? 'bg-red-100 text-red-700' : 'bg-lime text-night'
                  }`}
                >
                  {needsReview ? 'Review' : 'Matched'}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
