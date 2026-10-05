import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Logo } from '../components/Logo'
import { submitWaitlistEmail, useWaitlist } from '../components/Waitlist'
import { usePrefersReducedMotion } from '../lib/useInView'
import { DmThread } from '../sections/DmThread'
import { Ledger } from '../sections/Ledger'

const rotations = ['AI in the DM', 'Payment to order match', 'Receipt issued']

const workflow = [
  ['A Customer messages you', 'Enquiries from WhatsApp, Instagram and others arrive in one inbox.'],
  ['Verdaunt replies in the chat', 'AI answers using your approved products, prices, and stock.'],
  ['The order is created', 'The customer selects a product and receives a payment link.'],
  ['Payment and stock are updated', 'Verdaunt records payment, adjusts inventory and reconcilate account.'],
  ['The receipt is issued.', 'The customer receives confirmation in the same conversation.'],
]

const pillars = [
  {
    title: 'Sell from the chat',
    items: ['AI replies', 'Product catalogue', 'Payment links', 'One inbox', 'Abandoned-cart follow-up'],
  },
  {
    title: 'Keep the books current',
    items: [
      'Payment records',
      'Inventory updates',
      'Receipts',
      'Sales ledger',
      'Bank reconciliation, when the account is connected',
    ],
  },
  {
    title: 'Keep customers coming back',
    items: ['Order updates', 'Repeat-purchase reminders', 'Loyalty', 'Referrals', 'Customer history'],
  },
]

const faqs = [
  {
    q: 'What does Verdaunt actually do?',
    a: 'A customer messages you. Verdaunt’s AI replies in the DM, sends a payment link, logs the payment, updates inventory, reconciles it to your account, and issues the receipt back into the chat.',
  },
  {
    q: 'Does the AI talk to customers for me?',
    a: 'Yes. It answers in the DM from your products, prices, and stock, then sends the payment link without you leaving the conversation.',
  },
  {
    q: 'What happens after they pay?',
    a: 'The payment is logged automatically, inventory drops, the sale is matched to your account, and the receipt is issued into the same chat.',
  },
  {
    q: 'Can I run more than one shop?',
    a: 'Yes. Each shop gets a subaccount, with its own inbox, inventory, and books, under the same login.',
  },
  {
    q: 'Do I have to change the accounts I already use?',
    a: 'No. You connect the bank and chat accounts you already have, and you book delivery from inside Verdaunt.',
  },
  {
    q: 'What if someone adds items and doesn’t pay?',
    a: 'Verdaunt follows up on the abandoned cart in the channel they were already using, with the payment link still attached.',
  },
]

export function HomePage() {
  const { openWaitlist } = useWaitlist()

  return (
    <main id="top" className="bg-night">
      <section className="relative overflow-hidden px-5 pt-16 pb-28 md:pt-24 md:pb-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(184,230,143,0.22),transparent_46%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-mist md:text-[4.25rem]">
            <span className="sr-only">
              {/* From the customer DM to the receipt. AI replies, the payment link goes out, and the receipt comes back. */}
            </span>
            <span aria-hidden="true" className="block">
            Turn every customer DM into a completed sale.
            </span>
            <HeroRotator />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Built for Nigerian merchants selling through WhatsApp and Instagram.
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
        <section id="workflow" className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold tracking-[0.16em] text-muted uppercase">How it works</p>
          <h2 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
            One path, from the first message to the receipt.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {workflow.map(([title, body], index) => (
              <li key={title} className="rounded-3xl bg-sand p-5">
                <p className="text-sm font-semibold text-muted">0{index + 1}</p>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="product" className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold tracking-[0.16em] text-muted uppercase">Core benefits</p>
          <div className="mt-12 space-y-16">
            <div id="ai">
              <Shot
                copyFirst
                title="AI in the DM"
                body="The AI reads the message, checks what you have in stock, and answers in the chat. It can take the order without you typing a reply."
              >
                <DmThread />
              </Shot>
            </div>
            <Shot
              copyFirst
              title="The payment link, then the receipt"
              body="A payment link goes out in the same conversation. When the customer pays, Verdaunt logs it and issues the receipt back into the chat."
            >
              <div className="grid items-center gap-4 md:grid-cols-2">
                <ChatInvoice />
                <ReceiptCard />
              </div>
            </Shot>
            <div id="inventory">
              <Shot
                copyFirst
                title="Inventory reconciles with the account"
                body="The sale that just happened in chat is the same sale on your stock count and on your bank. You do not enter it twice."
              >
                <Ledger />
              </Shot>
            </div>
          </div>
        </section>

        <section id="features" className="bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
              The shop keeps running after the sale.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="rounded-3xl bg-white p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em]">Use the accounts you already have.</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Connect the bank and the chat apps you sell on today. Verdaunt reads them. You do not open a new
                account to get paid or to talk to customers.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <IntegrationGroup title="Chats" items={['WhatsApp', 'Instagram', 'Facebook', 'SMS']} />
                <IntegrationGroup title="Accounts" items={['GTBank', 'Access', 'Zenith', 'Kuda', 'Opay', 'Mono']} />
              </div>
            </div>
            <div className="rounded-3xl bg-sand p-6">
              <h3 className="text-2xl font-semibold tracking-tight">Delivery, booked in the app</h3>
              <p className="mt-3 leading-relaxed text-muted">
                When the order is paid, book the delivery service you already use without leaving Verdaunt. The
                customer gets the update in the same chat as the receipt.
              </p>
              <ol className="mt-6 space-y-3 text-sm">
                {['Order paid', 'Rider booked', 'Tracking sent in the DM'].map((item, index) => (
                  <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                    <span className="text-xs font-semibold text-muted">0{index + 1}</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
              Shops stay in the chat. Verdaunt finishes the sale.
            </h2>
            <p className="mt-8 max-w-2xl text-2xl leading-snug font-medium tracking-tight">
              Built with feedback from Nigerian merchants selling through WhatsApp and Instagram.
            </p>
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
              Let the DM finish as a receipt.
            </h2>
            <p className="mt-4 max-w-lg text-white/70">
              AI in the chat, the payment logged, inventory updated, and the receipt issued. No credit card required.
            </p>
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

function Shot({
  title,
  body,
  children,
  copyFirst = false,
}: {
  title: string
  body: string
  children: ReactNode
  copyFirst?: boolean
}) {
  const copy = (
    <>
      <h3 className={`text-3xl font-semibold tracking-tight ${copyFirst ? '' : 'mt-6'}`}>{title}</h3>
      <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
    </>
  )
  const frame = <div className={`rounded-[28px] bg-sand p-4 md:p-8 ${copyFirst ? 'mt-6' : ''}`}>{children}</div>
  return (
    <div>
      {copyFirst ? copy : null}
      {frame}
      {copyFirst ? null : copy}
    </div>
  )
}

const receiptLines = [
  ['Ankara, 6 yards', '₦28,000'],
  ['Lace, 5 yards', '₦18,500'],
  ['Aso-oke cap', '₦7,500'],
  ['Delivery to Lekki', '₦3,000'],
]

function ReceiptCard() {
  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-white p-6 shadow-sm">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime text-night"
        role="img"
        aria-label="Verdaunt"
      >
        <Logo />
      </div>
      <p className="mt-3 text-center text-lg font-semibold">Lekki Textiles</p>
      <p className="text-center text-xs text-muted">Supplier receipt · extracted</p>
      <p className="mt-4 text-center text-sm">
        <span className="text-muted">Buyer · </span>Amaka Okeke
      </p>
      <dl className="mt-5 space-y-2 text-sm">
        {receiptLines.map(([item, price]) => (
          <div key={item} className="flex justify-between gap-4">
            <dt>{item}</dt>
            <dd>{price}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 rounded-xl bg-lime/40 px-2 py-1">
          <dt>VAT</dt>
          <dd>₦2,100</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-2 font-semibold">
          <dt>Total</dt>
          <dd>₦59,100</dd>
        </div>
      </dl>
    </div>
  )
}

const transferAccount = '0123456789'
const invoiceAmount = '₦145,000'

function ChatInvoice() {
  const [method, setMethod] = useState<'transfer' | 'link'>('transfer')
  const [copied, setCopied] = useState(false)

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(transferAccount)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 rounded-full bg-sand p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setMethod('transfer')}
          aria-pressed={method === 'transfer'}
          className={`rounded-full px-3 py-2 ${method === 'transfer' ? 'bg-night text-white' : 'text-muted'}`}
        >
          Transfer
        </button>
        <button
          type="button"
          onClick={() => setMethod('link')}
          aria-pressed={method === 'link'}
          className={`rounded-full px-3 py-2 ${method === 'link' ? 'bg-night text-white' : 'text-muted'}`}
        >
          Payment link
        </button>
      </div>
      {method === 'transfer' ? (
        <div className="mt-4 rounded-2xl bg-night px-4 py-4 text-mist">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime text-night" role="img" aria-label="Verdaunt">
            <Logo />
          </div>
          <p className="mt-3 text-3xl font-semibold">{invoiceAmount}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.16em] text-lime uppercase">GTBank</p>
              <p className="mt-1 font-mono text-lg font-semibold tracking-wide">{transferAccount}</p>
            </div>
            <button
              type="button"
              onClick={copyAccount}
              aria-label={copied ? 'Account number copied' : 'Copy account number'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-night px-4 py-4 text-mist">
          <p className="text-[11px] tracking-[0.16em] text-lime uppercase">Lekki Textiles Invoice</p>
          <p className="mt-1 text-3xl font-semibold">{invoiceAmount}</p>
          <p className="mt-3 rounded-full bg-white py-2 text-center text-sm font-medium text-night">Pay now</p>
        </div>
      )}
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
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
