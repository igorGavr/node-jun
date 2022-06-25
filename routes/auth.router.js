const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');


router.post('/login',
    authMiddleware.isUserPresentForAuth,
    authController.login);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

module.exports = router;
