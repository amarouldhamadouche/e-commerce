import virifyToken from "../../../middleware/virifyToken";
import Order from '../../../models/Order'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()

  if(method === "GET"){ 
   const AQuery = req.query.all
   const userId = req.query.userId

   if(AQuery){
    if(req.user.isAdmin){
    try{
      const orders = await Order.find()
      res.status(200).json(orders)
    }catch(err){
     res.status(500).json(err)
    }}else{
      res.status(403).json('you are not allowed')
    }
  
  } else if(userId) {
    if(req.user.id==userId || req.user.isAdmin){
     try{
      const order = await Order.find({userId:userId})
      res.status(200).json(order)
     }catch(err){
      res.status(500).json(err)
     }}else{
      res.status(403).json('you are not allowed to do this')
     }
   }
  }
  if(method=="POST"){
    
  }
 }

 
export default virifyToken(handler)