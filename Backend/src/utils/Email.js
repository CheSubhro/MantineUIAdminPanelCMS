
import nodemailer from "nodemailer";

// Send an email
const sendEmail = async (to, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: `"Blog Admin" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        text: body,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;