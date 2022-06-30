const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const {FORGOT_PASSWORD} = require("../configs/email-action.enum");


router.post('/login',               // обробник запиту на /login
    authMiddleware.isLoginBodyValid,     // валідація пароля та емейл
    authMiddleware.isUserPresentForAuth, // пошук Юзера по імейлу
    authController.login);               // порівнюємо паролі , генеруємо пару токенів
                                         // та записуємо їх та Айдішку юзера в табличку OAuth

router.post('/password/forgot',
    authMiddleware.isLoginBodyValid,     // валідація пароля та емейл
    authMiddleware.isUserPresentForAuth, // пошук Юзера по імейлу
    authController.forgotPassword);

router.post('/password/forgot/set',
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setForgotPassword);


router.post('/refresh',             // обробник запиту на /refresh
    authMiddleware.checkRefreshToken,    // перевіряємо refresh токен та прокидуємо tokenInfo
    authController.refresh);             // видаляємо поточний токен та генеруємо нову пару токенів

router.post('/logout',              // обробник запиту на /logout
    authMiddleware.checkAccessToken,     // перевіряємо токен
    authController.logout);              // видаляємо токен з таблички OAuth

router.post('/logoutAllDevices',    // обробник запиту на /logoutAllDevices
    authMiddleware.checkAccessToken,     // перевіряємо токен
    authController.logoutAllDevices);    // видаляємо всі поля в табл. OAuth котрі мають Айді нашого Юзера

module.exports = router;
