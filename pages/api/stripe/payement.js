const stripe = require("stripe")(process.env.STRIPE_API)

const  handler = async(req,res)=>{
 const {method} = req
 if (method==='POST'){
   stripe.charges.create({
    source : req.body.tokenId,
    amount : req.body.amount,
    currency : "usd",
   },(stripeErr,stripeRes)=>{
    if(stripeErr){
     res.status(500).json(stripeErr)
    }else{
     res.status(200).json(stripeRes)
    }
   })
 }}

 export default handler