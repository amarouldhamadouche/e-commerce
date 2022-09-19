import dbConnect from "../../../util/mongo";
import Cart from "../../../models/Cart"
import virifyToken from "../../../middleware/virifyToken";


 const handler = async(req,res)=>{

 const {method,query:{id}} = req;
 dbConnect()

  if (method==="PUT"){
   if(req.user.id === id || req.user.isAdmin){ 
    try{
    const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(cart)
   }catch(err){
    res.status(502).json(err)
    }}
   else{
    res.status(400).json('you are not allowed')
   }
   }


   if(method==='DELETE'){
    
      if(req.user.id === id || req.user.isAdmin){ 
       try{
       await Cart.findByIdAndDelete(id)
       res.status(200).json('Cart deleted successfuly')
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
      const cart = await Cart.findOne({userId:id})
      res.status(200).json(cart)
     }catch(err){
      res.status(404).json('cart not found')
     }
    }else{
     res.status(403).json('you are not allowed to do this')
    }
  }
 
}

export default virifyToken(handler)