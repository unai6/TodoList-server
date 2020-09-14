const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  let token = req.header('x-auth-token') || req.headers['authorization'];
  console.log(token)
  if(!token) return res.status(404).json({msg: 'No token provided'});
  if(token.startsWith('Bearer')) token = token.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(err) res.status(401).json({ msg: 'Token not valid'})
    console.log(err)
    req.decoded = decoded 
    next()
  })
}