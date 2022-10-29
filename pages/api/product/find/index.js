import Product from '../../../../models/Product'
import dbConnect from "../../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 await dbConnect()
 if(method==="GET"){
   const qNew = req.query.new
   const qCategorie = req.query.categorie
  try{
    let products
    if(qNew){
      products = await Product.find().sort({createdAt:-1}).limit(5)
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

  export default handler