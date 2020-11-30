const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    category:String,
    important: {type:Boolean, default:false},
    completed: {type:Boolean, default:false},
    taskDay: {type:Date}
},
    {
        timestamps: {
            createdAt: true,
            updatedAt:true

        }
    }
)

const Task = mongoose.model('Task', taskSchema);

module.exports = Task