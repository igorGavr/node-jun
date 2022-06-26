const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');


router.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);
router.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

module.exports = router;
