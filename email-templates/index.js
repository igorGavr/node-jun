const emailActions = require('../configs/email-action.enum')

module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'  // файл який потрібно прорендерити
    },

    [emailActions.FORGOT_PASSWORD]: {
        subject: 'Oops looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActions.USER_BANNED]: {
        subject: 'Account was blocked',
        template: 'account-blocked'
    }
}
