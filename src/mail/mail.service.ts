import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // ou outro provedor SMTP
      port: 587,
      secure: false,
      auth: {
        user: 'lucas.eeufrasio16@gmail.com',    // seu e-mail
        pass: 'useg mrhb bckt lxmq',      // app password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, attachments?: any[]) {
    const info = await this.transporter.sendMail({
      from: '"DataCrypt" <seuemail@gmail.com>',
      to,
      subject,
      text,
      attachments,
    });
    console.log('E-mail enviado:', info.messageId);
  }
}
