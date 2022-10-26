import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
 username:{
  type:String,
  required:true,
  maxlength:60,
  unique:true
 },
  name:{
  type:String,
  required:true,
  maxlength:60,
 },
  lastName:{
  type:String,
  required:true,
  maxlength:60,
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
 adresses:[
  {
   wilaya:{
    type:String,
    required:true
   },
   commune:{
    type:String,
    required:true
   },
   street:{
    type:String,
    required:true
   }
  },
 ],
 principleAddress:{
  type:String,
  required:false,
 },
 phoneNumber:{
  type:String,
 },
 hasPaid: {
   type:Number,
   default:0
 },
 isBlocked: {
  type:Boolean,
  defalut: false
 }
},{
 timestamps:true
})
export default mongoose.models.User || mongoose.model('User',UserSchema)