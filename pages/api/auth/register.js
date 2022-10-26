const bcrypt = require('bcrypt');
import dbConnect from "../../../util/mongo";
import User from "../../../models/User"
const jwt = require('jsonwebtoken')
import cookie from 'cookie'

export default async function handler(req, res) {
 const {method} = req
 dbConnect()
 if (method==='POST'){
  try{
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password,salt)

  const newUser = new User({
   name:req.body.name,
   lastName:req.body.lastName,
   username:req.body.username,
   email:req.body.email,
   phoneNumber:req.body.phoneNumber,
   password:hashedPassword,
   isBlocked:false
  })

  const user = await newUser.save()
  const {password,...others} = user._doc
  const accessToken = jwt.sign({
   id:user._id,
   isAdmin:user.isAdmin
 },
 process.env.JWT_SEC)
 res.setHeader('Set-Cookie',
 cookie.serialize('token',accessToken,{
  maxAge:24 * 1800 ,
  sameSite:'strict',
  path : '/'
}))
  res.status(200).json({...others,accessToken})

  }catch(err){
  res.status(500).json(err)
  }
 }
}