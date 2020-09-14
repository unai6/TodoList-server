const express = require('express');
const router = express.Router()

const userSignUp = require('../appControllers/userController');
const userLogin = require('../appControllers/userController');
const userDashboard = require('../appControllers/userController');
const checkToken  = require('../helpers/middlewares');


const tasks = require('../appControllers/taskController');

/*User Routes */
router.post('/signup', userSignUp.userSignup);
router.post('/login', userLogin.login);
router.get('/dashboard/:userId', userDashboard.dashboard)



/* Tasks Routes */

router.post('/create-task/:userId', tasks.createTask)
router.post('/delete-task/:userId/:taskId', tasks.deleteTask)
router.post('/edit-task/:userId/:taskId', tasks.editTask)

module.exports = router