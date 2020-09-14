
const jwt = require('jsonwebtoken');


// module.exports = (req, res, next) => {
//   let token = req.header('x-auth-token') || req.headers['authorization'];

  
//   if(!token) return res.status(404).json({msg: 'No token provided'});
//   if(token.startsWith('Bearer')) token = token.split(' ')[1]
  
//   jwt.verify(token, process.env.SECRET_KEY, (err, authorizedData) => {
//     console.log(err)
//     if(err) res.status(401).json({ msg: 'Token not valid'})
//     req.decoded = authorizedData 
//     next()
//   })
// }


exports.checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {

      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;

      next();
  } else {

      res.sendStatus(403);
  };
};