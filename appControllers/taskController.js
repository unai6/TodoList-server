const Task = require('../models/Task');
const User = require('../models/User')

exports.createTask = async (req, res) => {
    try {
        const {userId} = req.params;
        const { name, category, description } = req.body;
        const newTask = await Task.create({ name, category, description });
        const userinDB = await User.findByIdAndUpdate(userId, { $push:{ tasks:newTask } }, {new:true});

        res.status(200).json(userinDB)
    } catch (error) {
        res.sendStatus(404)
    };
};

exports.deleteTask = async (req, res) => {
    try {
        const {userId, taskId} = req.params;
        await Task.findByIdAndRemove(taskId);
        const userinDB = await User.findByIdAndUpdate(userId, { $pull : { tasks:taskId } }, {new:true});

        res.status(200).json(userinDB)
    } catch (error) {
        res.sendStatus(404)
    };
}

exports.editTask = async (req, res) => {
    try {

        const {userId, taskId} = req.params;
        const { name, category, description } = req.body;
        const newTask = await Task.findByIdAndUpdate(taskId, { name, category, description });
        const userinDB = await User.findByIdAndUpdate(userId, {newTask} , {new:true});

        res.status(200).json(userinDB)
    } catch (error) {
        res.sendStatus(404)
    };
}