const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER || 'bbirthday314@gmail.com', // Replace with your email
        pass: process.env.PASS || 'mofg cwgh xtdw hbjp',    // Replace with App Password
    }, // Output detailed logs
});

module.exports = { transporter };
