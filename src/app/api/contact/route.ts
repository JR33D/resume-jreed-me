import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { email, message } = body ?? {};

  if (!email || !message) {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  }

  const apiKey   = process.env.SMTP2GO_API_KEY;
  const fromAddr = process.env.SMTP2GO_FROM_EMAIL;
  const toAddr   = process.env.CONTACT_TO_EMAIL ?? 'contact@jreed.me';

  if (!apiKey || !fromAddr) {
    console.error('[contact] SMTP2GO env vars not set');
    return NextResponse.json({ error: 'Mail not configured.' }, { status: 500 });
  }

  const smtp2goRes = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key:   apiKey,
      sender:    `jreed.me contact <${fromAddr}>`,
      to:        [toAddr],
      subject:   `Message from ${email}`,
      text_body: `From: ${email}\n\n${message}`,
      html_body: `<p><strong>From:</strong> ${email}</p><p style="white-space:pre-wrap">${message}</p>`,
    }),
  });

  const result = await smtp2goRes.json().catch(() => ({}));

  if (!smtp2goRes.ok || result?.data?.error) {
    console.error('[contact] SMTP2GO error', result);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
