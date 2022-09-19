import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
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
    }
   }
  ],
  amount:{
   type:Number,
   required:true
  },
  adress:{
   type:Object,
   required:true
  },
  status:{
   type:Number,
   default:0
  }
 
},{
 timestamps:true
})
export default mongoose.models.Order || mongoose.model('Order',OrderSchema)