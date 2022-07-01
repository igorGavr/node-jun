module.exports = {
    PORT: process.env.PORT || 5555,
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://igorgavr:igorgavr@cluster0.xmdjroa.mongodb.net/?retryWrites=true&w=majority',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'qwe', // КОДОВЕ слово повино бути мін 30 символів
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sad',
    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'dsggd',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'ragamuffinrogi@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'umaginlvdohblvpp',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
};
