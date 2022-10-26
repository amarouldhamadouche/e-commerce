import dbConnect from "../../../util/mongo";
import User from "../../../models/User"
import virifyToken from "../../../middleware/virifyToken";
const bcrypt = require('bcrypt');

const handler = async(req,res)=>{

 const {method,query:{id}} = req;
 dbConnect()
 if (method==='PUT'){
  if(req.body.password){
   const user = await User.findById(id)
   const  validPassword = await bcrypt.compare(req.body.currentPassword,user.password)
   !validPassword && res.status(400).json('wrong credential')
   const salt = await bcrypt.genSalt(10)
   req.body.password = await bcrypt.hash(req.body.password,salt)
  }
  try{
   if(req.user.id==id || req.user.isAdmin){ 
    console.log(req.body)
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(user)
    console.log(req.body)
   }else{
    res.status(400).json('you are not allowed')
   }
   }catch(err){
     res.status(502).json(err,'err')
     console.log(req.body)
}
 }

if(method==='DELETE'){
  try{
    if(req.user.id==id || req.user.isAdmin){ 
     await User.findByIdAndDelete(id)
     res.status(200).json('user deleted successfuly')
    }else{
     res.status(400).json('you are not allowed to do that')
    }
    }catch(err){
      res.status(502).json(err)
 }
}


if(method==='GET'){
  try{
    if(req.user.id==id || req.user.isAdmin){ 
     const user = await User.findById(id)
     res.status(200).json(user)
    }else{
     res.status(400).json('you are not allowed to do that')
    }
    }catch(err){
      res.status(502).json(err)
 }
}
}
export default virifyToken(handler)