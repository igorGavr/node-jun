const { Schema, model } = require('mongoose');
const {passwordService} = require("../services");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },

    age: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true
    }
}, { timestamps: true});
// довчити  { timestamps: true, toObject: {transform: (doc, ret, options) => { }}});
// довчити .lean


// methods працюють до record
// here this це один ЮЗЕР
UserSchema.methods = {
    // кастомний метод який використовується до певного Юзера
    // приклад використання - req.user.comparePassword(password)
    async comparePassword(password) {   // тут hashed password, password
        await passwordService.comparePassword(this.password, password)
    }
}

// here this це ціла Колекція
// statics працюють до UserSchema
UserSchema.statics = {
    createWithHashPassword: async function (userToSave) {
        // кастомний static метод який використовує МОНГО для хешування паролю
        // приклад використання - User.createWithHashPassword(req.body)
        const hashedPassword = await passwordService.hashPassword(userToSave.password);

        return this.create({...userToSave, password: hashedPassword})
    }
}

module.exports = model('user', UserSchema);
