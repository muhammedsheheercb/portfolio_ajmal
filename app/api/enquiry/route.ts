import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  let sameOrigin = true;
  if (origin) {
    try {
      const incoming = new URL(origin);
      sameOrigin = configuredOrigin
        ? incoming.origin === new URL(configuredOrigin).origin
        : ["http:", "https:"].includes(incoming.protocol) &&
          incoming.host === request.headers.get("host");
    } catch {
      sameOrigin = false;
    }
  }
  if (!sameOrigin)
    return NextResponse.json(
      { error: "This request is not allowed." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    input = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Please check your enquiry and try again." },
      { status: 400 },
    );
  }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_FROM)
    return NextResponse.json(
      {
        error:
          "Online enquiries are not available yet. Please use email or WhatsApp below.",
      },
      { status: 503 },
    );
  const { name, email, phone, service, message } = parsed.data;
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM,
        // to: [profile.email],
        to: ["ajmalaboobaker22@gmail.com"],
        reply_to: email,
        subject: `Portfolio enquiry: ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${service}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) {
      const details = await result.json().catch(() => null);
      const reason =
        typeof details?.message === "string"
          ? details.message
              .replace(/re_[A-Za-z0-9_-]+/g, "[redacted]")
              .slice(0, 500)
          : "Email provider rejected the request.";
      // Log only the provider status and reason, never keys or enquiry content.
      console.error(`[Enquiry] Resend returned ${result.status}: ${reason}`);
      return NextResponse.json(
        {
          error:
            "Your enquiry could not be sent. Please try again or contact me directly.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      `[Enquiry] Email request failed (${error instanceof Error ? error.name : "unknown error"}). Check connectivity and provider availability.`,
    );
    return NextResponse.json(
      {
        error:
          "Your enquiry could not be sent. Please try again or contact me directly.",
      },
      { status: 502 },
    );
  }
}
