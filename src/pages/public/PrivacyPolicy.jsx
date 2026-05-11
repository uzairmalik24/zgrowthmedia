import LegalLayout from "../../components/ui/LegalLayout";

const SECTIONS = [
    {
        heading: "1. Who we are",
        body: `Z Growth Media ("we", "us", "our") is a digital marketing agency operating from offices in the United Kingdom and Pakistan. This Privacy Policy explains how we collect, use, store and share personal data when you interact with our website, contact us, or engage our services.

Contact for privacy matters: {{EMAIL_ADDRESS}}.`,
    },
    {
        heading: "2. Data we collect",
        body: `We collect the following categories of personal data:
• Identity & contact data — name, business email, phone number, and company name when you submit a contact form, request a quote, or engage our services.
• Project data — information about your business, marketing assets, account access (where you grant it), and content you share with us under a signed engagement.
• Technical data — IP address, browser type, device information, referring URLs, and pages visited via cookies and analytics tools (see Section 7).
• Communications — emails, WhatsApp messages, and meeting notes exchanged with our team.`,
    },
    {
        heading: "3. How we use your data",
        body: `We process personal data for the following purposes:
• Responding to enquiries and providing quotes you have requested.
• Delivering and improving the services you have engaged us for.
• Sending operational communications related to active engagements.
• Sending marketing communications where you have opted in (you can unsubscribe at any time).
• Meeting legal, accounting, and tax obligations in our operating jurisdictions.`,
    },
    {
        heading: "4. Lawful bases (UK / EU GDPR)",
        body: `Where UK-GDPR or EU-GDPR applies, we rely on the following lawful bases:
• Contract — to negotiate and perform our engagement with you.
• Legitimate interests — to operate, secure, and improve our website and services.
• Consent — for marketing communications and non-essential cookies.
• Legal obligation — for record-keeping, tax, and regulatory compliance.`,
    },
    {
        heading: "5. Data sharing",
        body: `We do not sell personal data. We share personal data only with:
• Service providers that help us operate our business (hosting, email delivery, analytics, payment processors such as Wise and PayPal). These providers act under contract and are bound to confidentiality.
• Professional advisers (lawyers, accountants, auditors) where strictly necessary.
• Authorities, where we are legally required to do so.

International transfers — where data moves between our UK and Pakistan offices, or to processors outside the UK/EEA, we rely on appropriate safeguards (Standard Contractual Clauses or equivalent).`,
    },
    {
        heading: "6. Data retention",
        body: `We retain personal data only for as long as necessary for the purposes set out above, or as required by law. Project data is retained for the duration of the engagement plus a reasonable period afterwards for audit and reference. Marketing contacts are retained until you unsubscribe.`,
    },
    {
        heading: "7. Cookies & analytics",
        body: `Our website uses essential cookies to function and analytics cookies (Google Analytics 4) to understand traffic. You can control cookies via your browser settings; disabling some cookies may degrade site functionality.`,
    },
    {
        heading: "8. Your rights",
        body: `Subject to applicable law (UK-GDPR / EU-GDPR / equivalent), you have the right to:
• Access the personal data we hold about you.
• Request correction of inaccurate data.
• Request deletion of your data ("right to be forgotten").
• Restrict or object to processing.
• Data portability.
• Withdraw consent at any time, where processing is based on consent.

To exercise any of these rights, email {{EMAIL_ADDRESS}}. You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) or your local supervisory authority.`,
    },
    {
        heading: "9. Security",
        body: `We use reasonable administrative, technical and organisational measures to protect personal data, including HTTPS-only transport, access controls, and secured production environments. No transmission over the internet is fully secure; we cannot guarantee absolute security but commit to notifying affected users in the event of a qualifying breach as required by law.`,
    },
    {
        heading: "10. Children's data",
        body: `Our services are intended for businesses and adults. We do not knowingly collect personal data from anyone under 16. If you believe we hold such data, contact us and we will delete it.`,
    },
    {
        heading: "11. Changes to this policy",
        body: `We may update this Privacy Policy from time to time. Material changes will be posted on this page with a revised "Last updated" date.`,
    },
    {
        heading: "12. Contact",
        body: `For any privacy-related questions, contact:

Z Growth Media
{{UK_OFFICE_ADDRESS}}
{{PK_OFFICE_ADDRESS}}
Email: {{EMAIL_ADDRESS}}
WhatsApp: {{WHATSAPP_NUMBER}}`,
    },
];

export default function PrivacyPolicy() {
    return (
        <LegalLayout
            label="Privacy Policy"
            title={"Your Data,\nResponsibly."}
            tag="04"
            lastUpdated="2026-05-11"
            intro="How Z Growth Media collects, uses, stores and protects personal data — written to comply with UK-GDPR / EU-GDPR standards and applicable Pakistan law."
            sections={SECTIONS}
        />
    );
}
