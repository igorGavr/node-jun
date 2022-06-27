const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");


router.get('/',                     // обробник на /users для отримання всіх Юзерів
    userMiddleware.isUserQueryValid,     // валідуємо query params : name, age, email
    userController.allUsers)             // шукаємо всіх юзерів та видаємо їх згідно шаблону
router.post('/',                    // обробник на /users для створення нового Юзера
    userMiddleware.isUserValidForCreate, // валідуємо нового Юзера отриманого з req.body
    userMiddleware.isUserUniq,           // перевіряємо юзера на унікальність за полем email
    userController.createUser)           // записуємо в базу нового юзера

router.get('/:id',                  // обробник на /users/:id для отримання одного юзера
    commonMiddleware.isIdValid,          // перевіряємо на валідність Айдішку за допомогою Types.ObjectId.isValid
    userMiddleware.isUserPresent,
    userController.getUserById)
router.put('/:id',                   // обробник на /users/:id для оновлення даних юзера
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,      // перевіряємо токен та дістаємо інфу про юзера з табл. User
    userMiddleware.isUserValidForUpdate,  // валідуємо дані про юзера - name, age
    userMiddleware.isUserPresent,         // перевіряємо чи присутній юзер в базі
    userController.updateUserById)        // оновлення даних юзера
router.delete('/:id',                 // обробник на /users/:id для видалення юзера
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUserById)

module.exports = router;
