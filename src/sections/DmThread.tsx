import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, usePrefersReducedMotion } from '../lib/useInView'

const SLIDE_MS = 700

export function DmThread() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.45)
  const [cycle, setCycle] = useState(0)
  const [beat, setBeat] = useState(reduced ? 4 : -1)
  const [notice, setNotice] = useState(false)
  const [noticeLeaving, setNoticeLeaving] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const prevHeight = useRef(0)
  const alertOn = beat >= 2

  useEffect(() => {
    if (reduced) {
      setBeat(4)
      return
    }
    if (!inView) return

    setBeat(-1)
    const timers = [500, 1800, 3400, 5000, 6800].map((delay, index) =>
      window.setTimeout(() => setBeat(index), delay),
    )
    const loop = window.setTimeout(() => setCycle((value) => value + 1), 10500)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(loop)
    }
  }, [inView, cycle, reduced])

  useEffect(() => {
    if (!alertOn) {
      setNotice(false)
      setNoticeLeaving(false)
      return
    }

    setNotice(true)
    setNoticeLeaving(false)
    const hide = window.setTimeout(() => {
      if (reduced) setNotice(false)
      else setNoticeLeaving(true)
    }, 2000)
    const remove = window.setTimeout(() => setNotice(false), reduced ? 2000 : 2400)

    return () => {
      clearTimeout(hide)
      clearTimeout(remove)
    }
  }, [alertOn, reduced])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const next = track.offsetHeight
    const delta = next - prevHeight.current
    prevHeight.current = next

    if (reduced || delta <= 0) {
      track.style.transition = 'none'
      track.style.transform = 'translateY(0)'
      return
    }

    track.style.transition = 'none'
    track.style.transform = `translateY(${delta}px)`
    void track.offsetHeight
    track.style.transition = `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
    track.style.transform = 'translateY(0)'
  }, [beat, reduced])

  return (
    <div ref={ref} className="mx-auto w-full max-w-[280px]">
      <div className="flex h-[600px] flex-col rounded-[2.75rem] bg-night p-2.5 shadow-[0_24px_50px_rgba(11,14,13,0.22)] ring-1 ring-white/10">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2.15rem] bg-[#1c1916] text-paper">
          <div className="flex h-7 items-end justify-center">
            <div className="mb-1 h-4 w-[84px] rounded-full bg-black" aria-hidden="true" />
          </div>
          <div className="flex items-center justify-between px-4 pb-2 text-[10px] text-sand/70">
            <span>9:41</span>
            <span className="text-lime">Active</span>
          </div>
          <div className="flex items-center gap-2 border-y border-white/10 px-4 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-[11px] font-semibold text-night">
              V
            </span>
            <span className="text-sm font-medium text-mist">Verdaunt</span>
          </div>
          <div className="relative min-h-0 flex-1">
            <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18px)]">
              <div ref={trackRef} className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-3 pt-4 pb-3">
                {beat >= 0 ? (
                  <Bubble side="them">Do you have this in black? And how much to deliver to Lekki?</Bubble>
                ) : null}
                {beat >= 1 ? (
                  <Bubble side="us">
                    <p>Yes, we have 2 left in stock. Delivery to Lekki is ₦3,000.</p>
                    <div className="mt-3 rounded-xl border border-night/10 bg-white/70 px-3 py-2 text-center">
                      <p className="text-base font-semibold">₦48,000 total</p>
                      <p className="text-[10px] tracking-[0.16em] uppercase">Tap to pay</p>
                    </div>
                  </Bubble>
                ) : null}
                {beat >= 3 ? (
                  <Bubble side="us">
                    <p>Payment received.</p>
                    <p className="mt-1">Here is your finalized receipt. Your order is now being processed.</p>
                    <p className="mt-3 rounded-xl border border-night/10 px-3 py-2 text-[11px]">
                      Receipt_#1042.pdf · Verified
                    </p>
                  </Bubble>
                ) : null}
                {beat >= 4 ? <Bubble side="them">Thank you.</Bubble> : null}
              </div>
            </div>
          </div>
          {notice ? <BankNotice leaving={noticeLeaving} /> : null}
          <div className="px-3 pt-1 pb-2">
            <div className="rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/35">Message</div>
          </div>
          <div className="flex justify-center pb-2" aria-hidden="true">
            <span className="h-1 w-24 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BankNotice({ leaving }: { leaving: boolean }) {
  return (
    <div
      className={`absolute inset-x-2.5 top-7 z-20 rounded-2xl bg-mist px-3 py-2.5 text-night shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${leaving ? 'notify-leave' : 'notify-drop'}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-night text-[10px] font-semibold text-lime">
          GT
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[11px] font-semibold">GTBank</p>
            <p className="text-[10px] text-muted">now</p>
          </div>
          <p className="text-sm font-semibold">₦48,000</p>
          <p className="text-[11px] text-muted">received from Sarah J.</p>
        </div>
      </div>
    </div>
  )
}

function Bubble({ side, children }: { side: 'them' | 'us'; children: ReactNode }) {
  return (
    <div className={`flex ${side === 'us' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          side === 'us' ? 'rounded-br-md bg-lime text-night' : 'rounded-bl-md bg-white/10 text-mist'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
