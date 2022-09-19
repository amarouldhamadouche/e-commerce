import virifyToken from "../../../middleware/virifyToken";
import Sell from '../../../models/Sell'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method,query:{id}} = req
 dbConnect()

 if (method==='GET'){
  if(req.user.isAdmin){
   const date = new Date()
   const lastYear = new Date(date.setYear(date.getYear()-1))
   try{
    const stats = await Sell.aggregate([
     {$match: {createdAt :{$gte:lastYear},ProductId:id}},
     {
       $project:{
         month : {$month:"$createdAt"},
         quantity : "$quantity",
       },
     },
     {
       $group:{
         _id:'$month',
          total:{$sum:"$quantity"}
       }
     }
    ])
    res.status(200).json(stats)
   }catch(err){
    res.status(501).json(err)
   }
 
}
 }

}


export default virifyToken(handler)