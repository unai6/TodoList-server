const express = require('express');
const router = express.Router()

const {login, getUserData, getUserTasks, dashboard, signUpWithGoogle, userSignup} = require('../appControllers/userController');
const {createTask, deleteTask, editTask} = require('../appControllers/taskController');
const {checkToken}  = require('../helpers/middlewares');

/*User Routes */
router.post('/google-signup', signUpWithGoogle)
router.post('/signup', userSignup);
router.post('/login', login);
router.get('/dashboard/:userId', checkToken, dashboard)
router.get('/userinfo/:userId', getUserData)
router.get('/:userId/alltasks', getUserTasks)

/* Tasks Routes */

router.post('/create-task/:userId', createTask)
router.post('/delete-task/:userId/:taskId', deleteTask)
router.post('/edit-task/:userId/:taskId', editTask)

module.exports = router