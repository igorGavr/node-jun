const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");


router.get('/',
    userMiddleware.isUserQueryValid,
    userController.allUsers)
router.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUniq,
    userController.createUser)

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById)
router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUserById)
router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUserById)

module.exports = router;
