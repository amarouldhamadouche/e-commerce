import mongoose from "mongoose";
const SellSchema = new mongoose.Schema({
 ProductId:{ 
  type:String,
  required:true,
 },
 quantity:{
  type:Number,
  default:1
 },
},{
 timestamps:true
})
export default mongoose.models.Sell || mongoose.model('Sell',SellSchema)