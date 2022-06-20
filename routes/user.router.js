const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware} = require("../middlewares");


router.get('/', userController.allUsers)
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
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUserById)
router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUserById)

module.exports = router;
