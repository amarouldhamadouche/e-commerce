import jwt from 'jsonwebtoken';

const virifyToken = (handler) => {
  return async (req, res) => {
    // Get token and check if it exists
    const authToken = req.headers.token

    if (authToken) {
     jwt.verify(authToken,process.env.JWT_SEC,(err,user)=>{
      if(err) res.status(403).json('token not valid')
      req.user = user
      return handler(req, res)
     })
    }else{
     res.status(400).json('there is no token')
    }
    
   }
  }


export default virifyToken