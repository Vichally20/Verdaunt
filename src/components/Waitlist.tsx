import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx17FYcXoZRY8sCWEjlxmJxl1wwV5lEOnSCKjj-QrF6_yuHCcWOgRtoFuRiz7eV5kF22Q/exec'

export async function submitWaitlistEmail(email: string) {
  const formData = new FormData()
  formData.append('email', email)
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  })
}

type WaitlistContextValue = {
  openWaitlist: () => void
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null)

export function useWaitlist() {
  const value = useContext(WaitlistContext)
  if (!value) throw new Error('useWaitlist must be used inside WaitlistProvider')
  return value
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  const openWaitlist = () => setOpen(true)

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      {children}
      {open ? <WaitlistDialog titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </WaitlistContext.Provider>
  )
}

function WaitlistDialog({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await submitWaitlistEmail(email)
      setSuccess(true)
    } catch (submitError) {
      console.error('Error submitting form:', submitError)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close waitlist"
        className="absolute inset-0 bg-night/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-sm font-medium text-night">Private beta</p>
        <h3 id={titleId} className="mt-2 font-display text-3xl text-ink">
          Join the waitlist
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We're currently in private beta. Drop your email below to get early access when we open up.
        </p>

        {success ? (
          <div className="mt-8 border border-line bg-sand px-4 py-6 text-center">
            <h4 className="font-display text-2xl text-ink">You're on the list.</h4>
            <p className="mt-1 text-sm text-muted">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@shop.com"
              className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none placeholder:text-muted focus:border-clay"
            />
            {error ? <p className="text-sm text-clay">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center rounded-full bg-night px-4 py-3 font-medium text-white transition-colors hover:bg-black disabled:opacity-70"
            >
              {submitting ? 'Processing...' : 'Request access'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
