import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
 userId:{
  type:String,
  required:true,
 },
 products:
  [
   {
    productId:{
     type:String,
     required:true
    },
    quantity:{
     type:Number,
     default:1
    },
    color:{
      type:String,
      required:true
    },
    size:{
      type:String,
      required:true
    }
   }
  ],
  amount:{
   type:Number,
   required:true
  }
 
},{
 timestamps:true
})
export default mongoose.models.Cart || mongoose.model('Cart',CartSchema)