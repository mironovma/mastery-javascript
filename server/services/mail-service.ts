import nodemailer from "nodemailer";

/**
 * Будем использовать Gmail в качестве сервиса по отправке писем.
 * https://mail.google.com/mail/u/1/#settings/fwdandpop
 * Пересылка и POP/IMAP -> Доступ по протоколу IMAP включить.
 * Далее в "Подробнее" можно получить все необходимые настройки.
 * Используем сервер для исходящей почту (SMTP) и получаем все необходимые настройки.
 */

class MailService {
    // Создаем transporter с помощью которого и будем отправлять письма с подтверждением регистрации
    transporter;

    // Создаем конструктор, где инициализируем почтовый клиент
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            /**
             * Если secure: true, то соединение будет использовать TLS при подключении к серверу.
             * Если false (по дефолту), то TLS используется, если сервер поддерживает
             * расширение STARTTLS. В большинстве случаев устанавливается true, если подключение
             * идет по порту 465. Для портов 587 или 25 оставляем false.
             * Gmail в этом случае использует 587, поэтому тут false.
             */
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    // Реализация отправки письма
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,

            subject:
                "[ АКТИВАЦИЯ ] Активация аккаунта на " + process.env.CLIENT_URL,
            // Текста не будет, т.к. сразу отправляем сверстанный html ниже.
            text: "",
            html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        });
    }
}

export const mailService = new MailService();
