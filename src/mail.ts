import nodemailer, { Transporter } from "nodemailer";
import config from "config";
import { Message, NotificationTransport } from "./types/notification-types";

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get("mail.host"),
      port: config.get("mail.port"),
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.pass"),
      },
    });
  }
  async send(message: Message) {
    // email send
    const info = await this.transporter.sendMail({
      from: config.get("mail.from"),
      // todo: validate for validate email
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    // todo: use logger instead of console
    console.log("Message sent: %s", info.messageId);
  }
}
