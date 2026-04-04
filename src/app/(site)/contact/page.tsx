import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <section style={{ padding: '8em 2em 4em', maxWidth: '55em', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--font-h1)', lineHeight: 1.05, marginBottom: '0.75em' }}>
        Contact
      </h1>

      <p style={{ fontSize: 'var(--font-h5)', opacity: 0.7, marginBottom: '2em' }}>
        Neem contact met ons op
      </p>

      {/* Contactformulier wordt per klant ingevuld */}
    </section>
  )
}
