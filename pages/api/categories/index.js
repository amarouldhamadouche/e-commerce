import Categories from '../../../models/Categories'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 await dbConnect()
 if (method==='POST'){
    const newCategorie = new Categories(req.body)
    try{
     const savedCategorie = await newCategorie.save()
     res.status(200).json(savedCategorie)
    }catch(err){
      res.status(500).json(err)
    }
 
 }

 if(method=='GET'){
   try{
    const categories = await Categories.find()
    res.status(200).json(categories)
   }catch(err){
    res.status(500).json(err)

   }
  }
 
}

export default handler
