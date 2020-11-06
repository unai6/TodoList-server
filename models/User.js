const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    email_verified:Boolean,
    nickName : String,
    password:String,
    tasks: [{type:mongoose.Schema.Types.ObjectId, ref:'Tasks'}]
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