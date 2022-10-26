import virifyToken from "../../middleware/virifyToken";

const  handler = async(req,res)=>{
 const {method} = req

 if (method==='GET'){
   if (req.user.isAdmin){
    res.status(201).json(true)
   }else{
    res.status(403).json(false)
   }
 }
}

export default virifyToken(handler)