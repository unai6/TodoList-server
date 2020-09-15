const User = require('../models/User');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { signToken } = require('../helpers/signToken');
const jwt = require('jsonwebtoken');

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


// exports.login = async (req, res) => {
//     const { nickName, password, remember } = req.body;

//     try {
//         let user = await User.findOne({nickName} );
//         if (!user) return res.status(404).json({ msg: 'User not found' });

//         const passCorrect = bcrypt.compareSync(password, user.password);
//         if (passCorrect) {

//             const token = signToken(user, remember);
//             res.status(200).json({
//                 token,
//                 user: {
//                     userId: user.id,
//                     nickName: user.nickName
//                 }
//             })
            
//         } else {
//             return res.status(401).json({ msg: 'nickName or password not valid' })
//         }


//     } catch (error) {
//         console.log(error);
//     }
// };

exports.login = async (req, res) => {
    const { nickName, password, remember } = req.body;
  
    try {
      let user = await User.findOne({ nickName });
  
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      const passCorrect = bcrypt.compareSync(password, user.password);
      if (!passCorrect) {
        return res.status(401).json({ msg: 'Email or password not valid' })
  
      } else if (passCorrect) {
  
        const token = signToken(user, remember);
       
          res.cookie('token', token, {
          maxAge: 432000000,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
          .status(200)
  
     
        res.status(200).json({
          token,
          user: {
            userId: user.id,
            nickName: user.nickName
  
          }
        });
  
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: "Server error" });
    }
  }


// exports.dashboard = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findById(userId).populate({
//             path: 'tasks',
//             model: 'Task'
//         });
//         res.status(200).json(user)

//     } catch (error) {
//         console.log(error)
//     }
// };


exports.dashboard = async (req, res) => {
    try {
   
        const { userId } = req.params
        const user = await User.findById(userId).populate({
            path: 'tasks',
            model: 'Task'
        });
        jwt.verify(req.headers['authorization'], process.env.SECRET_KEY, { userId }, (err, authorizedData) => {
            if (err) {
              
                    res.status(403).json('Protected route, you need an auth Token');
                } else {

                    res.json({
                        message: 'Successful login',
                        authorizedData,

                    });
                    res.json(user)
               
                }
            });
       
    } catch (error) { console.log(error)}

};

exports.getUserData = async (req, res) => {
  try {
    const {userId} = req.params;
  
    const user = await User.findById(userId).populate({
      path: 'tasks',
      model: 'Task'
  });
    res.status(200).json(user);
  
  }catch(error){
    console.log(error)
  }
};