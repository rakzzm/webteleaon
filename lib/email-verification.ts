import nodemailer from "nodemailer";

export async function sendSignupVerificationEmail({
  email,
  code
}: {
  email: string;
  code: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user || "Teleaon AI <info@teleaon.ai>";

  if (!host || !from) {
    return {
      sent: false,
      message: "Verification code was created, but SMTP email delivery is not configured yet."
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    ...(user && pass ? { auth: { user, pass } } : {})
  });

  await transporter.sendMail({
    to: email,
    from,
    subject: "Your Teleaon sign up verification code",
    text: `Your Teleaon verification code is ${code}. It expires in 10 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2>Verify your Teleaon account</h2>
        <p>Your verification code is:</p>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p>
        <p>This code expires in 10 minutes.</p>
      </div>
    `
  });

  return {
    sent: true,
    message: "Verification code sent. Please check your email."
  };
}
