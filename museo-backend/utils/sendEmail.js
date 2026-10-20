import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "Email configuration is missing. Please check your .env file."
    );
  }

  const port = Number(EMAIL_PORT || 587);

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port,
    secure: port === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_FROM || EMAIL_USER,
    to,
    subject,
    html,
  };

  const result = await transporter.sendMail(mailOptions);

  console.log("Email sent successfully:", result.messageId);

  return result;
};

export default sendEmail;