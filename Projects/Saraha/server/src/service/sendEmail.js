import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html, attachments) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.emailSender,
            pass: process.env.emailSenderPassword,
        },
    });

    const info = await transporter.sendMail({
        from: `"Eng. Samy Mostafa" <${process.env.emailSender}>`,
        to: to ? to : "samy.mostafa2001@gmail.com",
        subject: subject ? subject : "Greeting👉❤️💕",
        // text: "Hello world?", // plain text body
        html: html ? html : "<b>Hello world!!!!</b>",
        attachments: attachments ? attachments : []
        //[
        // {
        //     filename: "text.txt",
        //     content: "Hi Samy"
        // },
        // {
        //     filename: "samy.html",
        //     path: "./index.html",
        //     contentType: "text/html"
        // }
        //]


    });

    if (info.accepted.length) {
        return true;
    }
    return false;

}