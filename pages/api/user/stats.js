import dbConnect from "../../../util/mongo";
import User from "../../../models/User"
import virifyToken from "../../../middleware/virifyToken";

const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()
 if (method==='GET'){
  if(req.user.isAdmin){
   const date = new Date()
   const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
  try{
   const data = await User.aggregate([
    {$match :{ createdAt : {$gte : lastYear}}} ,
    {
     $project : {
      month : {$month:"$createdAt"}
     }
     },
     {
     $group : {
      _id : "$month",
      total:{$sum:1}
     }
    }
   ])
   res.status(200).json(data)
}catch(err){
 res.status(500).json(err)
}
}else{
 res.status(403).json('you are not allowed')
}
}

}

export default virifyToken(handler)