const User = require('../models/User');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { signToken } = require('../helpers/signToken');


exports.userSignup = async (req, res) => {

    try {
        const { name, nickName, password } = req.body;

        const nickNameExists = await User.findOne({ nickName }, 'nickName');
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);

        if (nickNameExists) {
            res.status(401).send('User already exists');
        } else {
            const newUser = await User.create({ name, nickName, password: hashPass });
            res.status(200).json(newUser)
        };
    } catch (error) {
        res.status(400).json({ error: error });
    }

}


exports.login = async (req, res) => {
    const { nickName, password, remember } = req.body;

    try {
        let user = await User.findOne({nickName} );
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const passCorrect = bcrypt.compareSync(password, user.password);
        if (!passCorrect) {

            return res.status(401).json({ msg: 'nickName or password not valid' })

        } else {
            const token = signToken(user, remember);
            res.status(200).json({
                token,
                user: {
                    userId: user.id,
                    nickName: user.nickName
                }
            })
        }


    } catch (error) {
        console.log(error);
    }
};


exports.dashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path: 'tasks',
            model: 'Task'
        });
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
};

