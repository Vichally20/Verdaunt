import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LegalLayout, LegalSection } from './pages/LegalLayout'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalLayout title="Terms of Service">
      <LegalSection title="1. Acceptance of Terms">
        By accessing or using the Verdaunt platform, you agree to be bound by these Terms of Service. If you do not
        agree to these terms, please do not use our services.
      </LegalSection>
      <LegalSection title="2. Description of Service">
        Verdaunt provides financial tooling, bookkeeping, invoicing, and receipt OCR for social commerce businesses. We
        provide read-only data aggregation and do not hold, move, or process customer funds directly.
      </LegalSection>
      <LegalSection title="3. User Obligations">
        You agree to provide accurate information when integrating your financial and social media accounts. You are
        responsible for maintaining the security of your account credentials.
      </LegalSection>
      <LegalSection title="4. Limitation of Liability">
        Verdaunt shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any
        loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the service.
      </LegalSection>
      <LegalSection title="5. Contact Information">
        <>
          If you have any questions regarding these Terms, you may contact us at{' '}
          <a href="mailto:hq@verdaunt.com.ng" className="text-ink underline">
            hq@verdaunt.com.ng
          </a>
          .
        </>
      </LegalSection>
    </LegalLayout>
  </StrictMode>,
)
