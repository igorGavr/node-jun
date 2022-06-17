const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware} = require("../middlewares");


router.get('/', userController.allUsers)
router.post('/', userMiddleware.isUserValidForCreate, userController.createUser)

router.get('/:id', commonMiddleware.isIdValid, userController.getUserById)
router.put('/:id', commonMiddleware.isIdValid, userController.updateUserById)
router.delete('/:id', commonMiddleware.isIdValid, userController.deleteUserById)

module.exports = router;
