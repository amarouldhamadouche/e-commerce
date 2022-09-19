import virifyToken from "../../../middleware/virifyToken";
import Cart from '../../../models/Cart'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()
 if (method==='POST'){
   const newCart = new Cart(req.body)
   try{
    const savedCart =  await newCart.save()
    res.status(200).json(savedCart)
   }catch(err){
    res.status(500).json(err)
   }
  }

  if(method === "GET"){
   if(req.user.isAdmin){
    try{
      const carts = Cart.find()
      res.status(200).json(carts)
    }catch(err){
     res.status(403).json('you are not allowed to do this')
    }
   }
  }
 }

 
export default virifyToken(handler)