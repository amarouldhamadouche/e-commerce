import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order"
import virifyToken from "../../../middleware/virifyToken";

 const handler = async(req,res)=>{

 const {method} = req;
 dbConnect()

  if (method==="GET"){
   if(req.user.isAdmin){
      const date = new Date()
      const lastMonth = new Date(date.setMonth(date.getMonth()-1))
      const prevMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
      try{
       const stats = await Order.aggregate([
        {$match: {createdAt :{$gte:prevMonth}}},
        {
          $project:{
            month : {$month:"$createdAt"},
            sales : "$amount"
          },
        },
        {
          $group:{
            _id:"$month",
            total:{$sum:"$sales"}
          }
        }
       ])
       res.status(200).json(stats)
      }catch(err){
       res.status(500).json(err)
      }
    }
  }
 }

 export default virifyToken(handler)