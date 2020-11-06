const express = require('express');
const router = express.Router()

const authController = require('../appControllers/userController');
const {checkToken}  = require('../helpers/middlewares');


const tasks = require('../appControllers/taskController');

/*User Routes */
router.post('/google-signup', authController.signUpWithGoogle)
router.post('/signup', authController.userSignup);
router.post('/login', authController.login);
router.get('/dashboard/:userId', checkToken, authController.dashboard)
router.get('/userinfo/:userId', authController.getUserData)
router.get('/:userId/alltasks', authController.getUserTasks)

/* Tasks Routes */

router.post('/create-task/:userId', tasks.createTask)
router.post('/delete-task/:userId/:taskId', tasks.deleteTask)
router.post('/edit-task/:userId/:taskId', tasks.editTask)

module.exports = router