import { NextResponse } from "next/server";
import { ENQUIRY_TYPES, ORG } from "@/lib/site";

/* ================================================================
   POST /api/contact

   Delivery is intentionally pluggable. Set CONTACT_WEBHOOK_URL to
   any endpoint that accepts a JSON enquiry — a CRM intake, a Zapier
   or Make hook, a Slack/Teams incoming webhook, or a small mail
   service. Until that variable is set the route answers 501 and the
   form falls back to opening the visitor's mail client with the
   same, correctly-routed message.

   The fallback matters: a form that silently swallows enquiries is
   worse than no form at all, and the audit found the previous site
   had exactly that problem.
   ================================================================ */

const WEBHOOK = process.env.CONTACT_WEBHOOK_URL;

interface Payload {
  name?: string;
  organisation?: string;
  designation?: string;
  email?: string;
  phone?: string;
  enquiryType?: string;
  message?: string;
  consent?: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Bots fill every field they find, including the hidden one.
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Please tell us your name.";
  if (!body.organisation?.trim()) errors.organisation = "Please tell us your organisation.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email)) errors.email = "Enter a valid email address.";
  if (!body.message?.trim()) errors.message = "Please tell us what you need.";
  if (!body.consent) errors.consent = "Please accept the privacy notice.";
  if (body.enquiryType && !ENQUIRY_TYPES.includes(body.enquiryType as (typeof ENQUIRY_TYPES)[number])) {
    errors.enquiryType = "Select an enquiry type from the list.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  if (!WEBHOOK) {
    return NextResponse.json(
      {
        error: "delivery-not-configured",
        message: "Online submission is not connected yet, so we have opened your email client with the details filled in.",
      },
      { status: 501 },
    );
  }

  try {
    const upstream = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: ORG.email,
        subject: `${body.enquiryType ?? "General"} enquiry — ${body.organisation}`,
        receivedAt: new Date().toISOString(),
        ...body,
      }),
    });

    if (!upstream.ok) throw new Error(`Upstream responded ${upstream.status}`);
  } catch {
    return NextResponse.json(
      {
        error: "delivery-failed",
        message: "We could not send that, so we have opened your email client with the details filled in.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
