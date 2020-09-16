const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    nickName : String,
    password:String,
    tasks: [{type:mongoose.Schema.Types.ObjectId, ref:'Tasks', required:true}]
},
    {
        timestamps: {
            createdAt: true,
            updatedAt:true

        }
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User