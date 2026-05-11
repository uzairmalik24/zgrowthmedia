import LegalLayout from "../../components/ui/LegalLayout";

const SECTIONS = [
    {
        heading: "1. About these terms",
        body: `These Terms & Conditions ("Terms") govern your use of the website at {{WEBSITE_URL}} (the "Site") and any services provided by Z Growth Media ("we", "us", "our"). By accessing the Site or engaging our services, you agree to be bound by these Terms.

If you do not agree, do not use the Site or our services.`,
    },
    {
        heading: "2. Services",
        body: `We provide digital marketing services including Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Experience Optimization (GEO), Social Media Marketing (SMM), and Media Platform Management. Specific scope, deliverables, timelines, and fees are governed by a separate written Engagement Letter or Statement of Work ("SOW") signed by both parties.

In the event of a conflict between these Terms and a signed SOW, the SOW prevails.`,
    },
    {
        heading: "3. Fees, invoicing & payment",
        body: `• Fees are quoted in the currency specified in your SOW (typically USD, GBP, or EUR).
• Standard retainer engagements are billed monthly in advance.
• Project engagements typically follow a 50% upfront / 50% on delivery structure.
• Accepted payment methods include Wise Business, PayPal Business, and direct bank transfer.
• Invoices are payable within 7 days of issue unless otherwise specified.
• Late payments may incur interest at 4% above the Bank of England base rate, accruing daily, and may result in suspension of services until cleared.`,
    },
    {
        heading: "4. Intellectual property",
        body: `• You retain ownership of all materials you provide to us (logos, copy, photos, brand assets, accounts).
• Upon full payment, you receive a perpetual, worldwide licence to use the final deliverables we produce as part of the engagement for your business purposes.
• We retain ownership of our underlying methodologies, frameworks, tools, and any pre-existing materials.
• We retain the right to reference completed work in case studies and marketing materials, unless an NDA explicitly prohibits this.`,
    },
    {
        heading: "5. Confidentiality",
        body: `Both parties agree to keep confidential any non-public information disclosed during the engagement. This obligation survives termination. Where you require it, we will sign a mutual NDA prior to detailed scoping.`,
    },
    {
        heading: "6. Acceptable use",
        body: `You may not:
• Use our services to promote unlawful, fraudulent, or harmful content.
• Use our services to engage in spam, black-hat SEO, or any tactics that violate the policies of major search engines or social platforms.
• Resell, sublicense, or misrepresent our services as your own without written agreement.
• Attempt to gain unauthorised access to our systems, accounts, or proprietary tools.`,
    },
    {
        heading: "7. Performance & no guarantees",
        body: `Marketing outcomes depend on many factors outside our control, including search engine and platform algorithms, competitor activity, market conditions, and product/market fit. While we work to industry-leading standards and report against agreed KPIs, we do not guarantee specific rankings, traffic, revenue, or financial outcomes. We provide forecasts in good faith based on data and experience; these are not warranties.`,
    },
    {
        heading: "8. Limitation of liability",
        body: `To the maximum extent permitted by law:
• Our total aggregate liability arising out of or in connection with any engagement shall not exceed the total fees paid by you to us in the three (3) months preceding the event giving rise to the claim.
• We shall not be liable for any indirect, incidental, consequential, or punitive damages, including loss of profits, revenue, or data.
• Nothing in these Terms limits liability for fraud, death or personal injury caused by negligence, or any other liability that cannot be limited by applicable law.`,
    },
    {
        heading: "9. Termination",
        body: `• Either party may terminate a retainer engagement with 30 days' written notice.
• We may terminate immediately if you breach these Terms or fail to pay an invoice when due and have not cured the breach within 14 days of written notice.
• Termination does not relieve you of obligations to pay for services already rendered.
• Sections relating to IP, confidentiality, and limitation of liability survive termination.`,
    },
    {
        heading: "10. Governing law & disputes",
        body: `These Terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction over any dispute arising from these Terms or any engagement, save that we may bring proceedings in any jurisdiction where you reside or do business to recover unpaid fees.

Before initiating formal proceedings, the parties agree to attempt in good faith to resolve any dispute through direct discussion.`,
    },
    {
        heading: "11. Changes to these Terms",
        body: `We may update these Terms from time to time. The most recent version posted on this page applies. Continued use of the Site or services after changes constitutes acceptance of the updated Terms.`,
    },
    {
        heading: "12. Contact",
        body: `Z Growth Media
{{UK_OFFICE_ADDRESS}}
{{PK_OFFICE_ADDRESS}}
Email: {{EMAIL_ADDRESS}}
WhatsApp: {{WHATSAPP_NUMBER}}`,
    },
];

export default function Terms() {
    return (
        <LegalLayout
            label="Terms & Conditions"
            title={"The Working\nAgreement."}
            tag="05"
            lastUpdated="2026-05-11"
            intro="The terms that govern your use of zgrowthmedia.com and any services provided by Z Growth Media."
            sections={SECTIONS}
        />
    );
}
