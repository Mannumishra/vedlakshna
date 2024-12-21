const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    debug: true,  // Enable debug logs
    logger: true, // Output detailed logs
});

module.exports = { transporter };
