import dbConnect from "../../../util/mongo";
import User from "../../../models/User"
import virifyToken from "../../../middleware/virifyToken";

const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()
 if (method==='GET'){
  const query = req.query.new
  if(req.user.isAdmin){
  try{
   const user = query? await User.find().sort({_id:-1}).limit(1) : await User.find()
   res.status(200).json(user)
}catch(err){
 res.status(404).json('user not found')
}
}else{
 res.status(403).json('you are not allowed')
}
}

}

export default virifyToken(handler)