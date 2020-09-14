const User = require('../models/User');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { signToken } = require('../helpers/signToken');


exports.userSignup = async (req, res) => {

    try{
        const {name, nickName, password} = req.body;

            const nickNameExists = await User.findOne({nickName}, 'nickName');
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPass = bcrypt.hashSync(password, salt);
          
            if(nickNameExists) {
                res.status(401).send('User already exists');
            } else {
                const newUser = await User.create({name, nickName, password:hashPass});
                 res.status(200).json(newUser)
            };
    } catch(error) {
        res.status(400).json({error:error});
    }
  
}


exports.login = async (req, res) => {

    try{
        const {nickName, password, remember} = req.body;
    
        const userinDB = await User.findOne({nickName});
        
        if (!userinDB) return res.status(404).json({ msg: 'User not found' });
     
        const correctPassword = bcrypt.compareSync(password, userinDB.password)
       

        if(correctPassword){
            res.cookie(process.env.PUBLIC_DOMAIN || process.env.PUBLIC_DOMAIN, {
                maxAge: 432000000,
                httpOnly: true,
                sameSite: 'None',
                secure: true,
              })
                .status(200)
        
              const token = signToken(userinDB, remember);

              res.status(200).json({
                token:token,
                user: {
                  userId: userinDB.id,
                  name:userinDB.name,
                  nickName: userinDB.nickName
                }
              });
         
        } else{
            res.status(401).json({mssg:'Wrong password or nickName'})
        }
    }catch(error){
        res.status(400).json({error:'Error login in'})
    }
}

exports.logout = async  (req, res) => {
    try {
        res.clearCookie(process.env.PUBLIC_DOMAIN);
        res.status(200).json({ msg: "Log out sucesfully" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Server error" });
      }
    return;
}



exports.dashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path:'tasks',
            model:'Task'
        });
        console.log(user)
        res.status(200).json(user)
     
    } catch (error) { 
        console.log(error)
    }
};

