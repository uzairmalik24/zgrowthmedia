import LegalLayout from "../../components/ui/LegalLayout";

const SECTIONS = [
    {
        heading: "1. Scope of this policy",
        body: `This Refund & Cancellation Policy applies to all services purchased from Z Growth Media ("we", "us") under a signed Engagement Letter or Statement of Work ("SOW"). It is intended to be transparent and to satisfy the requirements of payment providers including Wise Business and PayPal Business.

Where a specific SOW contains different refund or cancellation provisions, the SOW prevails.`,
    },
    {
        heading: "2. Retainer engagements",
        body: `• Monthly retainers are billed in advance on a rolling monthly basis.
• You may cancel at any time with 30 days' written notice (email to {{EMAIL_ADDRESS}} is sufficient).
• On cancellation, we will complete the work covered by your most recent paid invoice; no further invoices will be issued.
• Retainer fees already paid for the notice period are non-refundable, as work is already in progress or scheduled.`,
    },
    {
        heading: "3. Project engagements",
        body: `Project-based engagements typically follow a 50% upfront / 50% on delivery structure.

• Before kickoff — if you cancel within 48 hours of payment and we have not yet begun work, you are entitled to a full refund of the upfront payment.
• After kickoff but before delivery — if you cancel mid-project, you may request a refund of the unused portion of your upfront payment, calculated pro-rata against work already completed. Work completed is non-refundable.
• On delivery — once the final deliverable has been delivered and accepted, the engagement is considered complete and no refund is available.`,
    },
    {
        heading: "4. Subscription / package fees",
        body: `Pre-paid annual or multi-month packages may be cancelled at any time. Refunds are issued on a pro-rata basis for the unused months, less any discount that was applied for the multi-month commitment.`,
    },
    {
        heading: "5. Non-refundable items",
        body: `The following are not refundable under any circumstance:
• Third-party costs paid on your behalf (ad spend, paid tools, hosting, paid placements).
• Custom creative or content already produced and delivered.
• Strategy, audit, and consulting deliverables already produced.
• Work performed against an agreed scope where deliverables met the specification.`,
    },
    {
        heading: "6. How to request a refund or cancel",
        body: `To request a refund or cancel an engagement:
1. Email {{EMAIL_ADDRESS}} with subject line "Refund Request — [Your Company Name]" or "Cancellation — [Your Company Name]".
2. Include your invoice number and a brief reason.
3. We will acknowledge your request within 2 business days.
4. If approved, refunds are issued via the original payment method within 7–14 business days, depending on the processor.`,
    },
    {
        heading: "7. Disputes & chargebacks",
        body: `Please contact us before initiating a chargeback. We aim to resolve all disputes in good faith and most issues can be settled by direct conversation. Unjustified chargebacks may be contested with the relevant processor (Wise / PayPal / card network) and supporting documentation will be provided.`,
    },
    {
        heading: "8. Service-level guarantee",
        body: `If we fail to deliver against the specific deliverables in a signed SOW within the agreed timeline (excluding delays caused by client unavailability, scope changes, or third-party platforms), and we cannot remedy within a reasonable period after written notice, you may request a refund of the portion of fees attributable to the undelivered work.

Marketing performance KPIs (rankings, traffic, conversions) are forecasts not guarantees — see Section 7 of our Terms & Conditions.`,
    },
    {
        heading: "9. Contact",
        body: `For all refund or cancellation requests:

Z Growth Media
{{UK_OFFICE_ADDRESS}}
{{PK_OFFICE_ADDRESS}}
Email: {{EMAIL_ADDRESS}}
WhatsApp: {{WHATSAPP_NUMBER}}`,
    },
];

export default function RefundPolicy() {
    return (
        <LegalLayout
            label="Refund & Cancellation"
            title={"Fair, Transparent,\nWritten Down."}
            tag="06"
            lastUpdated="2026-05-11"
            intro="Our refund and cancellation terms — written transparently to satisfy Wise Business and PayPal Business verification requirements."
            sections={SECTIONS}
        />
    );
}
