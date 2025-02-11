const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.post('/signinGoogle', userController.googleLogin)
router.get('/',userController.find)

module.exports = router