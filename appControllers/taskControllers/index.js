const Task = require('../../models/Task');
const User = require('../../models/User')

const taskControllers = {

    createTask : async (req, res) => {
        try {
            const {userId} = req.params;
            const { name, category, description, taskDay} = req.body;
            const newTask = await Task.create({ name, category, description, taskDay });
            const userinDB = await User.findByIdAndUpdate(userId, { $push:{ tasks:newTask } }, {new:true});
            
            res.status(200).json(userinDB)
        } catch (error) {
            res.sendStatus(404)
        };
    },
    
    deleteTask : async (req, res) => {
        try {
            const {userId, taskId} = req.params;
            await Task.findByIdAndRemove(taskId);
            const userinDB = await User.findByIdAndUpdate(userId, { $pull : { tasks:taskId } }, {new:true});
            
            res.status(200).json(userinDB)
        } catch (error) {
            res.sendStatus(404)
        };
    },
    
    editTask : async (req, res) => {
        try {
            
            const {userId, taskId} = req.params;
            const { name, category, description, completed, important, taskDay } = req.body;
            const newTask = await Task.findByIdAndUpdate(taskId, { name, category, description, completed, important, taskDay });
            const userinDB = await User.findByIdAndUpdate(userId, {newTask} , {new:true});
            
            res.status(200).json(userinDB)
        } catch (error) {
            res.sendStatus(404)
        };
    }
}

module.exports = taskControllers;