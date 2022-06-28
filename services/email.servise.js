const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD } = require('../configs/configs');
const emailTemplates = require('../email-templates');
const CustomError = require("../errors/CustomError");

module.exports = {
    sendMail: async (userMail = '', emailAction = '', locals = {}) => {
        // створюємо екземпляр класу та вказуємо де лежать наші views
        const templateParser = new EmailTemplates({
            views: {root: path.join(process.cwd(), 'email-templates')}
        });
        // беремо з emailTemplates наш Template - WELCOME
        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            throw new CustomError('Wrong email action', 500);
        }

        locals.frontendURL = 'google.com'

        // почикай поки templateParser прорендерить Template - WELCOME
        const html = await templateParser.render(templateInfo.template, locals);

        // займається відправкою емейлів
        const transporter = nodemailer.createTransport({
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    }
}
// umag inlv dohb lvpp
// pm.environment.set("userId", jsonBody.user._id)
