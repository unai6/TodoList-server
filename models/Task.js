const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    category:String,
    completed: {type:Boolean, default:false},
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