import nodemailer from "nodemailer";

export async function sendMail({ html, text, email, subject }) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      type: "login",
      user: process.env.G_EMAIL,
      pass: process.env.G_PASSWORD,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Pharma Provide" <XXXXXXXXXXXXXXXXXXXXXXXX>',
    to: email,
    subject,
    text,
    html: html,
  });
}
