import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { submitWaitlistEmail, useWaitlist } from '../components/Waitlist'
import { usePrefersReducedMotion } from '../lib/useInView'
import { DmThread } from '../sections/DmThread'
import { Ledger } from '../sections/Ledger'

const rotations = ['In your DMs', 'On the ledger', 'At tax time']

const capabilities = [
  ['Zero-touch categorization', 'Transactions land in tax-compliant ledgers on their own.'],
  ['Real-time P&L', 'Profit updates with every sale and every expense.'],
  ['Bank-grade security', 'Read-only bank access. We never move your funds.'],
  ['Multi-currency', 'Take payment anywhere and reconcile in naira.'],
  ['Tax export', 'One click, then hand a clean file to your accountant.'],
  ['Omnichannel sync', 'A sale in any chat locks stock everywhere else.'],
  ['FIRS tax grouping', 'Taxes grouped for TaxPro Max, with supplier landed costs.'],
  ['Receipt OCR', 'A photo or a forwarded email becomes a logged expense.'],
  ['Chat invoices', 'A payment link that renders inside WhatsApp and Instagram.'],
]

const faqs = [
  {
    q: 'Does Verdaunt replace my accountant?',
    a: 'No. Verdaunt acts as an automated bookkeeper. We organize your raw data, automate the categorization, and prepare tax-ready exports. Your accountant will love us, as we hand them perfectly reconciled data.',
  },
  {
    q: 'Which banks do you support?',
    a: 'We integrate with over 5,000 global financial institutions via open banking protocols (Plaid, Tink, Mono). If you have an online bank account, chances are we support it.',
  },
  {
    q: 'How do social media integrations work?',
    a: 'You connect your Instagram Professional or WhatsApp Business account via our API. Verdaunt securely reads DMs containing order intent or invoice links and maps them back to the bank ledger when payment is received.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Extremely. We only request read-only access to your bank feeds. We cannot move your money. All data is encrypted at rest using AES-256 and in transit via TLS 1.3.',
  },
]

const steps = ['Connect your bank', 'Link WhatsApp and Instagram', 'Send a chat invoice', 'Match transfers automatically', 'Export for tax']

export function HomePage() {
  const { openWaitlist } = useWaitlist()

  return (
    <main id="top" className="bg-night">
      <section className="relative overflow-hidden px-5 pt-16 pb-28 md:pt-24 md:pb-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(184,230,143,0.22),transparent_46%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-mist md:text-[4.25rem]">
            <span className="sr-only">Financial clarity in your DMs, on the ledger, and at tax time.</span>
            <span aria-hidden="true" className="block">
              Financial clarity
            </span>
            <HeroRotator />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Automate your bookkeeping, reconcile bank transfers instantly, and send chat-friendly invoices. The
            financial stack built specifically for Instagram, WhatsApp, and TikTok merchants.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <HeroEmail id="hero-email" />
            <button
              type="button"
              onClick={openWaitlist}
              className="rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white hover:border-white"
            >
              Book a demo
            </button>
          </div>
        </div>
      </section>

      <div className="rounded-t-[40px] bg-white text-ink">
        <section id="product" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
            Get the books right in chat, on the bank, and at tax time.
          </h2>
          <div className="mt-14 space-y-16">
            <Shot
              title="In your DMs"
              body="Never leave the chat to type an invoice link. Verdaunt reads the message, checks stock, and drops a checkout card into WhatsApp, Instagram, and Messenger."
            >
              <DmThread />
            </Shot>
            <Shot
              title="On the bank"
              body="Mono Connect listens to the bank switch. The moment cash arrives, the narration is matched to the invoice and the books move on their own."
            >
              <Ledger />
            </Shot>
            <Shot
              title="At tax time"
              body="Snap a supplier receipt or forward an email. Line items, VAT, and totals are extracted, then grouped for the FIRS TaxPro Max portal."
            >
              <ReceiptCard />
            </Shot>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
            <div>
              <h2 className="text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
                Hand a debtor over once.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Stop copy-pasting reminder messages. Verdaunt follows up on WhatsApp, SMS, and voice, politely at first
                and firmer as the date slips, with a payment link in every message until the transfer lands.
              </p>
              <ol className="mt-8 divide-y divide-line rounded-3xl bg-white">
                {[
                  ['Day 1', 'Gentle WhatsApp nudge'],
                  ['Day 3', 'SMS follow-up'],
                  ['Day 5', 'Paid · +₦45,000'],
                ].map(([day, label]) => (
                  <li key={day} className="flex items-center justify-between px-5 py-4">
                    <span>
                      <span className="mr-3 text-xs font-semibold tracking-wide text-muted uppercase">{day}</span>
                      {label}
                    </span>
                    {label.startsWith('Paid') ? (
                      <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-semibold text-night">Matched</span>
                    ) : (
                      <span className="text-sm text-muted">Sent</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <ChatInvoice />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
            Founders focus on growth. We handle the ledger.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Quote
              quote="Before Verdaunt, I spent my Sunday evenings matching bank alerts to Instagram DMs. Now, it happens instantly while I sleep."
              name="Sarah Jenkins"
              role="Founder, Aura Apparel"
            />
            <Quote
              quote="The WhatsApp invoices are a game changer. Customers see the total, click the link, and pay. When the payment hits, Verdaunt logs it as revenue."
              name="David Chen"
              role="Owner, Kismet Supply"
            />
          </div>
        </section>

        <section id="features" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Verdaunt gives you more.</h2>
            <p className="mt-3 text-lg text-muted">Everything else a social seller needs, in the same login.</p>
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(([title, body]) => (
                <li key={title}>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">Integrations</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Connect the banks and chats you already use. Direct integrations with GTBank, Access, and 5,000+ others.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <IntegrationGroup title="Chats" items={['WhatsApp', 'Instagram DMs', 'Messenger', 'SMS']} />
              <IntegrationGroup title="Banks" items={['GTBank', 'Access', 'Zenith', 'Kuda', 'Opay']} />
              <IntegrationGroup title="Open banking" items={['Mono', 'Plaid', 'Tink']} />
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">It’s easy to get started</h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-5">
              {steps.map((step, index) => (
                <li key={step} className="rounded-3xl bg-sand p-5">
                  <p className="text-sm font-semibold text-muted">0{index + 1}</p>
                  <p className="mt-3 font-semibold">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">FAQs</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                    {item.q}
                    <span className="text-muted group-open:hidden">+</span>
                    <span className="hidden text-muted group-open:inline">–</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-night text-mist">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <h2 className="max-w-xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-6xl">
              Start reconciling in seconds, not hours.
            </h2>
            <p className="mt-4 text-white/70">No credit card required. 14-day free trial on premium features.</p>
            <div className="mt-8">
              <HeroEmail id="closing-email" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function HeroRotator() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setIndex((value) => (value + 1) % rotations.length), 2400)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="rotator text-lime" aria-hidden="true">
      <span className="rotator-track" style={{ transform: `translateY(-${index * 1.15}em)` }}>
        {rotations.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </span>
  )
}

function HeroEmail({ id }: { id: string }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitWaitlistEmail(email)
      setDone(true)
    } catch (submitError) {
      console.error(submitError)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return <p className="rounded-full bg-lime px-5 py-3 text-sm font-medium text-night">You’re on the list.</p>
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex items-center rounded-full bg-white p-1.5">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-night px-5 py-2.5 text-sm font-medium text-white disabled:opacity-70"
        >
          {submitting ? '...' : 'Launch →'}
        </button>
      </form>
      {error ? <p className="mt-2 text-sm text-lime">{error}</p> : null}
    </div>
  )
}

function Shot({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <div>
      <div className="rounded-[28px] bg-sand p-4 md:p-8">{children}</div>
      <h3 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
    </div>
  )
}

function ReceiptCard() {
  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-center text-lg font-semibold">Lekki Textiles</p>
      <p className="text-center text-xs text-muted">Supplier receipt · extracted</p>
      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Ankara, 6 yards</dt>
          <dd>₦28,000</dd>
        </div>
        <div className="flex justify-between gap-4 rounded-xl bg-lime/40 px-2 py-1">
          <dt>VAT</dt>
          <dd>₦2,100</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-2 font-semibold">
          <dt>Total</dt>
          <dd>₦30,100</dd>
        </div>
      </dl>
    </div>
  )
}

function ChatInvoice() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">WhatsApp</p>
      <div className="mt-4 max-w-[90%] rounded-2xl rounded-bl-md bg-sand px-4 py-3 text-sm leading-relaxed">
        Hey! Here is the invoice for the 3 dresses. You can pay directly via this link.
      </div>
      <div className="mt-3 ml-8 rounded-2xl rounded-br-md bg-night px-4 py-4 text-mist">
        <p className="text-[11px] tracking-[0.16em] text-lime uppercase">Verdaunt invoice</p>
        <p className="mt-1 text-3xl font-semibold">₦145,000</p>
        <p className="mt-3 rounded-full bg-white py-2 text-center text-sm font-medium text-night">Pay now</p>
      </div>
    </div>
  )
}

function Quote({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure>
      <blockquote className="text-2xl leading-snug font-medium tracking-tight">“{quote}”</blockquote>
      <figcaption className="mt-5 text-sm text-muted">
        <span className="font-medium text-ink">{name}</span> · {role}
      </figcaption>
    </figure>
  )
}

function IntegrationGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
