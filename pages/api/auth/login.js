const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
import dbConnect from "../../../util/mongo";
import User from "../../../models/User"

export default async function handler(req, res) {
 const {method} = req
 dbConnect()
 if (method==='POST'){
  try{
   const user = await User.findOne({email:req.body.email})
   !user && res.status(404).json("user not found")
 
   const  validPassword = await bcrypt.compare(req.body.password,user.password)
   !validPassword && res.status(400).json('wrong credential')
  
   const {password,...others} = user._doc
   const accessToken = jwt.sign({
     id:user._id,
     isAdmin:user.isAdmin
   },
   process.env.JWT_SEC,
   {expiresIn:"3d"})
   res.status(200).json({...others,accessToken})
  }
  catch(err){
   res.status(500).json(err)
  }
 }
}