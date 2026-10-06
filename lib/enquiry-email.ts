import type { Enquiry } from "./enquiry";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

export function enquiryEmail({
  name,
  email,
  phone,
  service,
  message,
}: Enquiry) {
  const details = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Service", service],
  ];
  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:14px 0;border-bottom:1px solid #e8e5dd;width:90px;color:#666b63;font-size:13px;vertical-align:top;">${label}</td><td style="padding:14px 0;border-bottom:1px solid #e8e5dd;font-size:15px;color:#20251f;overflow-wrap:anywhere;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return {
    text: `New portfolio enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${service}\n\nProject details\n${message}\n\nReply to this email to contact ${name}.`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New portfolio enquiry</title></head><body style="margin:0;background:#f2f0e9;font-family:Arial,Helvetica,sans-serif;color:#20251f;">
<div style="display:none;max-height:0;overflow:hidden;">New ${escapeHtml(service)} enquiry from ${escapeHtml(name)}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f0e9;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e1ded5;">
<tr><td style="padding:32px;background:#20251f;border-top:4px solid #c4ae88;color:#f5f2ea;"><p style="margin:0 0 18px;font-size:11px;letter-spacing:2px;color:#d2bea0;">AJMAL ABOOBAKER · PORTFOLIO</p><h1 style="margin:0;font-size:28px;font-weight:500;">A new enquiry</h1><p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#d5d9d0;">Someone would like to work with you. Their details are below.</p></td></tr>
<tr><td style="padding:28px 32px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table><h2 style="margin:28px 0 12px;font-size:12px;letter-spacing:1px;color:#666b63;">PROJECT DETAILS</h2><div style="padding:20px;background:#f7f6f2;border-left:3px solid #c4ae88;font-size:15px;line-height:1.8;overflow-wrap:anywhere;">${escapeHtml(message).replace(/\r?\n/g, "<br>")}</div><p style="margin:28px 0 0;"><a href="mailto:${escapeHtml(encodeURIComponent(email))}" style="display:inline-block;padding:15px 24px;background:#20251f;color:#ffffff;text-decoration:none;font-size:14px;">Reply to ${escapeHtml(name)}</a></p><p style="margin:16px 0 0;color:#666b63;font-size:12px;line-height:1.6;">You can also reply directly to this email.</p></td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e8e5dd;font-size:11px;color:#777c73;line-height:1.6;">Sent through your portfolio enquiry form.<br>Photography · Videography · Editing</td></tr></table></td></tr></table></body></html>`,
  };
}
