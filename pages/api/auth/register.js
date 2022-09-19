const bcrypt = require('bcrypt');
import dbConnect from "../../../util/mongo";
import User from "../../../models/User"

export default async function handler(req, res) {
 const {method} = req
 dbConnect()
 if (method==='POST'){
  try{
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password,salt)

  const newUser = new User({
   username:req.body.username,
   email:req.body.email,
   password:hashedPassword
  })

  const user = await newUser.save()
  res.status(200).json(user)

  }catch(err){
  res.status(500).json(err)
  }
 }
}