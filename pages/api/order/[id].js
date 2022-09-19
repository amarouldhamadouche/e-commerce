import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order"
import virifyToken from "../../../middleware/virifyToken";


 const handler = async(req,res)=>{

 const {method,query:{id}} = req;
 dbConnect()

 if (method==='POST'){
  if(req.user.id === id){
   const newOrder = new Order(req.body)
   try{
    const savedOrder =  await newOrder.save()
    res.status(200).json(savedOrder)
   }catch(err){
    res.status(500).json(err)
   }
  }else{
   res.status(403).json('you are not allowed')
  }
  }
  if (method==="PUT"){
   if(req.user.isAdmin){ 
    try{
    const order = await Order.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(order)
   }catch(err){
    res.status(502).json(err)
    }}
   else{
    res.status(400).json('you are not allowed')
   }
   }


   if(method==='DELETE'){
    
      if(req.user.isAdmin){ 
       try{
       await Order.findByIdAndDelete(id)
       res.status(200).json('Order deleted successfuly')
      }catch(err){
       res.status(502).json(err)
       }
      }else{
       res.status(400).json('you are not allowed to do that')
      }
    
  }

  if (method ==='GET'){
    if( req.user.id === id || req.user.isAdmin){
     try{
      const order = await Order.findById(id)
      res.status(200).json(order)
     }catch(err){
      res.status(500).json(err)
     }
    }else{
     res.status(403).json('you are not allowed to do this')
    }
  }


 
}

export default virifyToken(handler)