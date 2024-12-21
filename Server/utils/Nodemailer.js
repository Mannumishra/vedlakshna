const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mannu22072000@gmail.com', // Replace with your email
        pass: 'zjbl jnup ksaz wrnr',    // Replace with App Password
    }, // Output detailed logs
});

module.exports = { transporter };
