const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        await transporter.sendMail({
            from: "PassOP 🔐",
            to,
            subject,
            html
        })

    } catch (err) {
        console.error("email failed", err)
        throw err
    }
}

module.exports = sendEmail;