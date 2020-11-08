const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    email_verified:Boolean,
    given_name:String,
    nickName : String,
    password:String,
    tasks: [{type:mongoose.Schema.Types.ObjectId, ref:'Task'}]
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