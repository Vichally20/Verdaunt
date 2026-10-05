import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LegalLayout, LegalSection } from './pages/LegalLayout'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalLayout title="Privacy Policy">
      <LegalSection title="1. Information We Collect">
        When you use Verdaunt, we may collect personal information such as your name, email address, and financial data
        retrieved strictly via read-only APIs when you link your accounts.
      </LegalSection>
      <LegalSection title="2. How We Use Your Information">
        We use your information to provide our services, process invoices, automate bookkeeping, improve our platform,
        and communicate with you regarding your account.
      </LegalSection>
      <LegalSection title="3. Data Security">
        Security is a core priority. We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data
        in transit. We never sell your personal or financial information to third parties.
      </LegalSection>
      <LegalSection title="4. Third-Party Services">
        We may share data with trusted third-party service providers (such as hosting or open-banking APIs like Plaid
        or Mono) solely for the purpose of operating our service.
      </LegalSection>
      <LegalSection title="5. Contact Information">
        <>
          If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
          <a href="mailto:hq@verdaunt.com.ng" className="text-ink underline">
            hq@verdaunt.com.ng
          </a>
          .
        </>
      </LegalSection>
    </LegalLayout>
  </StrictMode>,
)
