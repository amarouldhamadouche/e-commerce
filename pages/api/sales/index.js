import virifyToken from "../../../middleware/virifyToken";
import Sell from '../../../models/Sell'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()

 if (method==='POST'){
  if(req.user.isAdmin)
  {
   const newSell = new Sell(req.body)
   try{
    const savedSell =  await newSell.save()
    res.status(200).json(savedSell)
   }catch(err){
    res.status(500).json(err)
   }
  }else{
   res.status(403).json('you are not allowed')
  }
  }

  if (method==="GET"){
   if(req.user.isAdmin){
      const date = new Date()
      const lastYear = new Date(date.setYear(date.getYear()-1))
      try{
       const stats = await Sell.aggregate([
        {$match: {createdAt :{$gte:lastYear}}},
        {
          $project:{
            ProductId : "$ProductId",
            quantity : "$quantity"
          },
        },
        {
          $group:{
            _id:"$ProductId",
             total:{$sum:"$quantity"}
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