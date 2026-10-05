import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { submitWaitlistEmail, useWaitlist } from '../components/Waitlist'
import { usePrefersReducedMotion } from '../lib/useInView'
import { DmThread } from '../sections/DmThread'
import { Ledger } from '../sections/Ledger'

const rotations = ['AI in the DM', 'Payment logged', 'Receipt issued']

const workflow = [
  ['Customer messages you', 'On WhatsApp, Instagram, Facebook, or SMS. It lands in one inbox.'],
  ['AI replies in the chat', 'It answers from your stock and prices, then sends a payment link.'],
  ['The payment is logged', 'When the money arrives, Verdaunt records it against that order.'],
  ['Inventory and the account match', 'Stock drops, and the sale is reconciled to the bank on its own.'],
  ['The receipt goes back', 'After the transaction, the receipt is issued into the same chat.'],
]

const shopRuns = [
  {
    title: 'Voice bookkeeping',
    body: 'Say the sale or the expense out loud. Verdaunt writes it into the books, so you are not typing receipts at the end of the day.',
  },
  {
    title: 'Inventory management',
    body: 'Every product and variant has a count. A sale in any chat, on the site, or in another shop takes it down in the same place.',
  },
  {
    title: 'One inbox',
    body: 'WhatsApp, Instagram, Facebook, and SMS sit in a single inbox. You see the conversation, the order, and whether they have paid.',
  },
  {
    title: 'A subaccount for each shop',
    body: 'Run more than one shop from one login. Each shop keeps its own stock, chats, and books.',
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
              From the customer DM to the receipt. AI replies, the payment link goes out, and the receipt comes back.
            </span>
            <span aria-hidden="true" className="block">
              From the DM to the receipt
            </span>
            <HeroRotator />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            A customer messages you. Verdaunt replies in the chat, sends a payment link, logs the money, updates
            inventory, and issues the receipt after the transaction.
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

        <section id="product" className="mx-auto max-w-6xl px-5 pb-20">
          <div className="space-y-16">
            <div id="ai">
              <Shot
                title="AI in the DM"
                body="The AI reads the message, checks what you have in stock, and answers in the chat. It can take the order without you typing a reply."
              >
                <DmThread />
              </Shot>
            </div>
            <Shot
              title="The payment link, then the receipt"
              body="A payment link goes out in the same conversation. When the customer pays, Verdaunt logs it and issues the receipt back into the chat."
            >
              <div className="grid items-start gap-4 md:grid-cols-2">
                <ChatInvoice />
                <ReceiptCard />
              </div>
            </Shot>
            <div id="inventory">
              <Shot
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
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {shopRuns.map((item) => (
                <article key={item.title} className="rounded-3xl bg-white p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
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

        <section id="marketing" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
              Bring the customer back, and keep the ones who almost paid.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <article className="rounded-3xl bg-sand p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Loyalty, rewards, and referrals</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Points for repeat buyers, a reward they can spend, and a referral they can send to a friend. Verdaunt
                  tracks who came back and who they brought.
                </p>
              </article>
              <article className="rounded-3xl bg-night p-6 text-mist">
                <h3 className="text-2xl font-semibold tracking-tight">Abandoned carts get a follow-up</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Someone added items and went quiet. Verdaunt messages them in the channel they used, with the payment
                  link still on the order, so the sale is not lost.
                </p>
                <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                  “You left 2 dresses in the bag. Pay here and we’ll send them today.”
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] md:text-5xl">
              Shops stay in the chat. Verdaunt finishes the sale.
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
