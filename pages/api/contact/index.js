import virifyToken from "../../../middleware/virifyToken";
import Contact from '../../../models/Contact'
import dbConnect from "../../../util/mongo";


const  handler = async(req,res)=>{
 const {method} = req
 dbConnect()
 if (method==='POST'){
    const newContact = new Contact(req.body)
    try{
     const savedContact = await newContact.save()
     res.status(200).json(savedContact)
    }catch(err){
      res.status(500).json(err)
    }
 
 }

 if(method=='GET'){
  if(req.user.isAdmin){
   try{
    const Contacts = await Contact.find()
    res.status(200).json(Contacts)
   }catch(err){
    res.status(500).json(err)

   }
  }else{
   res.status(403).json('you are not allowed to do this')
  }
  }
 
}

export default virifyToken(handler)