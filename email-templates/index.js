const { emailActionTypeEnum } = require('../enums')

module.exports = {
    [emailActionTypeEnum.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'  // файл який потрібно прорендерити
    },

    [emailActionTypeEnum.FORGOT_PASSWORD]: {
        subject: 'Oops looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionTypeEnum.USER_BANNED]: {
        subject: 'Account was blocked',
        template: 'account-blocked'
    },

    [emailActionTypeEnum.LOGOUT]: {
        subject: 'User was logout',
        template: 'logout'
    },
}
