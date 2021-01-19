const dependencies = require('../services/dependencies');;
const router = dependencies.express.Router()
const userControllers = require('../appControllers/userControllers');
const taskControllers = require('../appControllers/taskControllers');

const {checkToken}  = require('../helpers/middlewares');

/*User Routes */
router.post('/google-signup', userControllers.signUpWithGoogle)
router.post('/signup', userControllers. userSignup);
router.post('/login', userControllers.login);
router.get('/dashboard/:userId', checkToken, userControllers.dashboard)
router.get('/userinfo/:userId', userControllers.getUserData)
router.get('/:userId/alltasks', userControllers.getUserTasks)

/* Tasks Routes */

router.post('/create-task/:userId', taskControllers.createTask)
router.post('/delete-task/:userId/:taskId', taskControllers.deleteTask)
router.post('/edit-task/:userId/:taskId', taskControllers.editTask)

module.exports = router