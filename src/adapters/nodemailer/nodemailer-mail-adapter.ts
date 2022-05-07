import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6844e1bdd4735c",
    pass: "72d122acb7e586"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Grimória <suporte@grimoria.com.br>',
      to: 'Lucas Silva lucaspedrodeveloper@gmail.com',
      subject,
      html: body,
    });
  };
}