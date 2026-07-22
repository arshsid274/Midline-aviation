import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type InquiryPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  aircraftType?: unknown;
  destination?: unknown;
  departureDate?: unknown;
  passengers?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this hidden field. */
  company?: unknown;
};

const RECIPIENT_EMAIL = "arshsid274@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,20}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const cleanString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildRow = (label: string, value: string) => `
  <tr>
    <td style="padding:8px 12px;font-weight:700;color:#111a5a;border-bottom:1px solid #dbe5f0;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#1f2937;border-bottom:1px solid #dbe5f0;">${escapeHtml(value || "Not provided")}</td>
  </tr>
`;

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ message: "Invalid inquiry request." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots learn nothing.
  if (cleanString(payload.company)) {
    return NextResponse.json({ message: "Inquiry sent." });
  }

  const fullName = cleanString(payload.fullName).slice(0, 120);
  const email = cleanString(payload.email).slice(0, 200);
  const phone = cleanString(payload.phone).slice(0, 30);
  const aircraftType = cleanString(payload.aircraftType).slice(0, 60);
  const destination = cleanString(payload.destination).slice(0, 160);
  const departureDate = cleanString(payload.departureDate).slice(0, 10);
  const passengers = cleanString(payload.passengers).slice(0, 20);
  const message = cleanString(payload.message).slice(0, 4000);

  const errors = [
    !fullName ? "Your name is required." : "",
    !EMAIL_PATTERN.test(email) ? "A valid email address is required." : "",
    phone && !PHONE_PATTERN.test(phone) ? "Please enter a valid phone number." : "",
    departureDate && !DATE_PATTERN.test(departureDate) ? "Please enter a valid departure date." : "",
  ].filter(Boolean);

  if (errors.length > 0) {
    return NextResponse.json({ message: errors[0] }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return NextResponse.json({ message: "Email service is not configured yet." }, { status: 500 });
  }

  const rows = [
    ["Full Name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Preferred Aircraft Type", aircraftType],
    ["Destination", destination],
    ["Desired Departure Date", departureDate],
    ["Passengers", passengers],
    ["Additional Notes", message],
  ];

  const textBody = rows.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n");
  const htmlBody = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2937;">
      <h2 style="margin:0 0 16px;color:#111a5a;">New Midline Aviation Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #dbe5f0;">
        <tbody>${rows.map(([label, value]) => buildRow(label, value)).join("")}</tbody>
      </table>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${fullName}`,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ message: "Inquiry sent." });
  } catch (error) {
    console.error("Inquiry email failed:", error);
    return NextResponse.json({ message: "Unable to send your inquiry right now." }, { status: 500 });
  }
}
