const jwt = require('jsonwebtoken')
module.exports = (req,res,next) =>{
  let token = req.body.token || req.headers.token
  if(token){
    try {
      req.decoded = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      next({
        status : 400,
        message :'Invalid Token'
      }) 
    }
  }else{
    next({
      status : 400,
      message : 'please login first'
    }) 
  }
}