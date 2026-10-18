const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email configuration is missing in .env");
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT || 587),
    secure: Number(EMAIL_PORT || 587) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: EMAIL_FROM || EMAIL_USER,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;