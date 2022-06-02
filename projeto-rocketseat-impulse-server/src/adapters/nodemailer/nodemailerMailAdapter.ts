import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3b04e1e05a0403",
        pass: "e7ed312ccce090"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Eduardo B. Silva <edu@gmail.com>',
            subject: subject,
            html: body
        })
    }
} 