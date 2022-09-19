import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
 title:{
  type:String,
  required:true,
  maxlength:20
 },
 desc:{
  type:String,
  required:true
 },
 img:{
  type:String,
  required:true
 },
 categories:{
  type:Array,
 },
 Sizes:{
  type:[String],
  required:true
 },
 colors:{
  type : [String],
  required:true
},
price:{
 type:String
},
},{
 timestamps:true
})
export default mongoose.models.Product || mongoose.model('Product',ProductSchema)