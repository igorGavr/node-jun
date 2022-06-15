const {userController} = require("../controllers");
const router = require('express').Router();

router.get('/', userController.allUsers)
router.post('/', userController.createUser)

router.get('/:userId', userController.getUserById)
router.put('/:userId', userController.updateUserById)
router.delete('/:userId', userController.deleteUserById)

module.exports = router;
