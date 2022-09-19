import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product"
import virifyToken from "../../../middleware/virifyToken";


const handler = async(req,res)=>{

 const {method,query:{id}} = req;
 dbConnect()

  if (method==="PUT"){
   if(req.user.isAdmin){ 
    try{
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(product)
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
       await Product.findByIdAndDelete(id)
       res.status(200).json('product deleted successfuly')
      }catch(err){
       res.status(502).json(err)
       }
      }else{
       res.status(400).json('you are not allowed to do that')
      }
    
  }
 
}

export default virifyToken(handler)