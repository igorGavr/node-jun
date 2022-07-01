const { smsActionTypeEnum } = require('../enums');

module.exports = {
    [smsActionTypeEnum.WELCOME]: (name) => {
        return `Hi ${name}, додому бо получиш по дупці`;
    },
};
