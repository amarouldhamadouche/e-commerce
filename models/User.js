import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
 username:{
  type:String,
  required:true,
  maxlength:60,
  unique:true
 },
 email:{
  type:String,
  unique:true
 },
 password:{
  type:String,
  required:true
 },
 isAdmin:{
  type:Boolean,
  default:false
 },
},{
 timestamps:true
})
export default mongoose.models.User || mongoose.model('User',UserSchema)