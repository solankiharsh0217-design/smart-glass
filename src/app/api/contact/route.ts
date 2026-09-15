import { NextResponse } from "next/server";

/**
 * Receives the contact form. Validation happens here so the client can stay dumb.
 *
 * NOTE: this currently only validates and logs. To actually deliver mail, plug a
 * provider in where marked below (Resend, Postmark, SES, SMTP — whatever the
 * client already pays for) and put its key in an env var.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address looks wrong." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  // --- Wire an email provider here ---------------------------------------
  // await resend.emails.send({
  //   from: "site@smartglassuk.com",
  //   to: CONTACT.email,
  //   replyTo: email,
  //   subject: `[Website] ${subject}`,
  //   text: `${name} <${email}>\n\n${message}`,
  // });
  // -----------------------------------------------------------------------
  console.log("[contact]", { name, email, subject, length: message.length });

  return NextResponse.json({ ok: true });
}
