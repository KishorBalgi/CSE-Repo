const nodemailer = require("nodemailer");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(mail) {
    this.to = mail.to;
    this.name = mail.name;
    this.from = mail.from;
    this.message = mail.message;
    // this.url = url;
  }
  // Create a transporter:
  newTransport() {
    // if (process.env.NODE_ENV === "production")
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  // Send mail:

  async send(template, subject) {
    // 1.Render HTML:
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      name: this.name,
      subject,
      message: this.message,
      // url: this.url,
    });
    // 2.Mail options:
    const mailOptions = {
      from: this.from,
      to: this.to,
      bcc: [this.from, "kishorwebdev@gmail.com"],
      subject: subject,
      text: htmlToText(html, {
        wordwrap: 130,
      }),
      html,
    };
    //3.Actually send the email:
    await this.newTransport().sendMail(mailOptions);
  }
  // Acknowledgement mail:
  async sendAcknowledgement() {
    await this.send(
      "emailTemplate",
      "Thank you for contacting us, we will surely address your request."
    );
  }
};
