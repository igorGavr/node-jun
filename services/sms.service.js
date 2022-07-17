const twilio = require('twilio');

const { configs } = require('../configs');

const client = twilio(configs.TWILIO_ACCOUNT_SID, configs.TWILIO_AUTH_TOKEN);


module.exports = {
    sendSMS: async (phone, message) => {
        try {
            console.log(`SMS start sending | to ${phone} | ${message}`);
            const smsInfo = await client.messages.create({
                    from: configs.TWILIO_NUMBER,
                    to: phone,
                    body: message,
                });
            // console.log(smsInfo)
            // console.log(`SMS response | status: ${smsInfo.status} | sid: ${smsInfo.sid}`);
        }catch (e) {
            console.error(`SMS error | to ${phone} | error: ${e}`);
        }
    }
}
