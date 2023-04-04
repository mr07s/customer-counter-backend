import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
// id:{type:String,required:true},
// SerialNo:{type:String,required:true},
// Name:{type:String,required:true},
// undertakenby:{type:String,required:true},
// price:{type:String,required:true},
// purchasingdate:{type:String,required:true},
// duedate:{type:String,required:true}


Name:{type:String},
undertakenby:{type:String},
price:{type:String},
purchasingdate:{type:String},
duedate:{type:String},
paidamount:{type:String},
userId:{type:String}



})
export default mongoose.model("customer",customerSchema);