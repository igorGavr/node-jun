module.exports = {
    PORT: 5000,
    MONGO_URL: 'mongodb+srv://igorgavr:igorgavr@cluster0.xmdjroa.mongodb.net/?retryWrites=true&w=majority',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'qwe', // КОДОВЕ слово повино бути мін 30 символів
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sad',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'ragamuffinrogi@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'umaginlvdohblvpp',
};
