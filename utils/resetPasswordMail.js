const nodemailer = require("nodemailer");

module.exports = async(email,subject,url,user) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<p>Hi ${user},
            <br>
            <br>
            You have recently requested to reset your password for your MyNoteBook account.
            <br>
            <br>
            First, you must verify your email by clicking the below link:
            <br>
            ${url}
            <br>
            <br>
            This link will verify your email address, and then you will be able to reset your password. <strong>Please keep in mind that This link is only valid for the next one hour.</strong>
            <br>
            <br>
            If you have problems, please paste the above URL into your web browser.
            <br><br>
            See you there!
            <br>
            <br>
            Best regards, the MyNoteBook team
        </p>`
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}