const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '20bdd1c84cc6ce816bc8e4d57ec670ca-3d0809fb-ee7e6a1b' ||  'MAIL_GUN_API_KEY', // TODO: Replace with your mailgun API KEY
        domain: 'sandbox3bc8c9a1481c40039f465c6331cecf0e.mailgun.org' || 'MAIL_GUN_DOMAIN' // TODO: Replace with your mailgun DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (name,email, subject, text, cb) => {
    const mailOptions = {
        from: email, // TODO replace this with your own email
        to: 'sjmehta0000@gmail.com', // TODO: the receiver email has to be authorized for the free tier
        subject:name,
        text:text,
        

    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;
