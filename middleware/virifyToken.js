import jwt from 'jsonwebtoken';
import { useStyleRegistry } from 'styled-jsx';

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
     res.status(400).json('you are not allowed to do do this')
    }
    
   }
  }


export default virifyToken