import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
 userName:{
  type:String,
  required:true,
 },
text:{
 type:String,
 required:true
}
},{
 timestamps:true
})
export default mongoose.models.Contact || mongoose.model('Contact',ContactSchema)