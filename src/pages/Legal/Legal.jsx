export default function Legal() {
  return (
    <section className="min-h-screen bg-main-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-main-darkGrey mb-2">Legal &amp; Privacy</h1>
          <p className="text-main-mediumGrey">
            Information about the entity behind this site and how your data is handled.
          </p>
        </div>

        {/* Imprint / provider identification (EU eCommerce Directive Art. 5) */}
        <div>
          <h2 className="text-2xl font-semibold text-main-darkGrey mb-4">Provider identification</h2>
          <div className="text-main-mediumGrey space-y-1">
            <p>This is the personal site of Silvia Arellano.</p>
            <p>Consulting engagements offered through this site are contracted by:</p>
            <div className="mt-3 pl-4 border-l-2 border-main-mediumGrey/30 space-y-1">
              <p className="text-main-darkGrey font-medium">OBEXDATA OÜ</p>
              <p>Registry code: [REGISTRY_CODE]</p>
              <p>Registered address: [REGISTERED_ADDRESS]</p>
              <p>
                Email:{" "}
                <a href="mailto:[LEGAL_EMAIL]" className="text-accent-softBlue hover:text-accent-mutedTeal">
                  [LEGAL_EMAIL]
                </a>
              </p>
              {/* Uncomment if VAT-registered:
              <p>VAT number: [VAT_NUMBER]</p> */}
            </div>
          </div>
        </div>

        {/* Privacy notice (GDPR) */}
        <div>
          <h2 className="text-2xl font-semibold text-main-darkGrey mb-4">Privacy notice</h2>
          <div className="text-main-mediumGrey space-y-4">
            <p>
              <span className="text-main-darkGrey font-medium">Contact form.</span>{" "}
              When you use the contact form, the details you submit (name, email address,
              subject, message) are transmitted via EmailJS (EmailJS Inc., USA) and delivered
              to us by email. We use them solely to respond to your inquiry and to follow up
              on potential engagements — never for marketing lists, and they are not sold or
              shared beyond that purpose. Messages are kept only as long as needed to handle
              the conversation; you can request deletion at any time via the email above.
            </p>
            <p>
              <span className="text-main-darkGrey font-medium">No tracking.</span>{" "}
              This site sets no cookies and runs no analytics or advertising trackers.
            </p>
            <p>
              <span className="text-main-darkGrey font-medium">Hosting.</span>{" "}
              The site is served by GitHub Pages (GitHub, Inc., USA), which may log technical
              request data (such as IP addresses) for security and operations per{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-softBlue hover:text-accent-mutedTeal"
              >
                GitHub&apos;s privacy statement
              </a>.
            </p>
            <p>
              <span className="text-main-darkGrey font-medium">Your rights.</span>{" "}
              Under the GDPR you may request access, correction, or deletion of your personal
              data, and you may lodge a complaint with a supervisory authority. Contact us at
              the email above for any of these.
            </p>
          </div>
        </div>

        <a href="/" className="inline-block text-accent-softBlue hover:text-accent-mutedTeal">
          ← Back to the site
        </a>
      </div>
    </section>
  );
}
