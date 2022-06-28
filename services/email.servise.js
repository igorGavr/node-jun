const nodemailer = require('nodemailer')

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../configs/configs')

module.exports = {
    sendEmail: () => {
        // transporter буде займатися відправкою емейлів
        const transporter = nodemailer.createTransport({
            auth: {  // від імені цього юзера
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail' // по такому сервісу
        })

        return transporter.sendMail({
            from: 'No reply',
            to: 'nadijabiljo@gmail.com',
            subject: 'Just do IT', // тема листа
            html: '<div style="color: greenyellow">Work Jango</div>'
        })
    }
}
// umag inlv dohb lvpp
// pm.environment.set("userId", jsonBody.user._id)
