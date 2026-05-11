import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, service, budget, message } = req.body;

    if (!name || !email || !service || !budget || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: [process.env.RESEND_EMAIL],
            reply_to: email,
            subject: `New Inquiry — ${service} from ${name}`,
            html: `
                <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:580px;margin:0 auto;padding:40px 32px;background:#f5f5f7;border-radius:16px;">
                    <h2 style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#888;">New Project Inquiry</h2>
                    <h1 style="margin:0 0 32px;font-size:28px;font-weight:900;color:#111;">From ${name}</h1>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#999;width:120px;">Email</td>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:15px;font-weight:600;color:#111;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#999;">Service</td>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:15px;font-weight:600;color:#111;">${service}</td>
                        </tr>
                        <tr>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#999;">Budget</td>
                            <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:15px;font-weight:600;color:#111;">${budget}</td>
                        </tr>
                    </table>
                    <div style="margin-top:28px;padding:24px;background:#fff;border-radius:10px;">
                        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#999;">Project Summary</p>
                        <p style="margin:0;font-size:15px;line-height:1.7;color:#111;white-space:pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Resend error:', err);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}