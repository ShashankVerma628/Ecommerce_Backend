const nodemailer = require("nodemailer");
const CONFIG = require("../config");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: CONFIG.SMTP_PORT,
    auth: {
      user: CONFIG.SMTP_USER_EMAIL,
      pass: CONFIG.SMTP_USER_PASSWORD,
    },
  });

  try {
    const emailServiceLive = await transporter.verify();
    if (emailServiceLive) {
      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
      };

      const emailSent = await transporter.sendMail(mailOptions);

      if (emailSent) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

module.exports = sendEmail;
