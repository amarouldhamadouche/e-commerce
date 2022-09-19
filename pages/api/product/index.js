import virifyToken from "../../../middleware/virifyToken";
import Product from '../../../models/Product'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()
 if (method==='POST'){
  if(req.user.isAdmin){
   const newProduct = new Product(req.body)
   try{
    const savedProduct =  await newProduct.save()
    res.status(200).json(savedProduct)
   }catch(err){
    res.status(500).json(err)
   }
  }else{
   res.status(403).json('you are not allowed to do this')
  }
 }

 if(method==="GET"){
  const qNew = req.query.new
  const qCategorie = req.query.categorie
  try{
   let products
   if(qNew){
     products = await Product.find().sort({createdAt:-1}).limit(1)
   }else if(qCategorie){
     products = await Product.find({
     categories:{
      $in:[qCategorie]
     }
    })
   }else{
    products = await Product.find()
   }
   res.status(200).json(products)
  }catch(err){
   res.status(500).json(err)
  }
 }

}


export default virifyToken(handler)