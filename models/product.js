import mongoose from "mongoose";

const productSchema = mongoose.Schema({

imageurl:{type:String},
productname:{type:String},
companyname:{type:String},
productquantity:{type:String},
productSellingquantity:{type:String},
productdate:{type:String},
userId:{type:String},


})
export default mongoose.model("product",productSchema);