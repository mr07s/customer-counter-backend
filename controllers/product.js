import mongoose from "mongoose"
import product from "../models/product.js"



export const  productdetails = async(req,res)=>{
const productdetails =req.body;
const postproductdetails = new  product(productdetails);
try {
await postproductdetails.save();
res.status(200).json("saved a product data sucessfully");
}
catch (error)
{
// console.log(error);
res.status(409).json("Coudn't post a productdetails");
}
};




export const getProductDetails =async (req,res) =>{
try{
const productList = await product.find();
res.status(200).json(productList);

}
catch (error) {
    
res.status(404).json({message:error.message})

}








}

export const deletedetails  =async(req,res)=>
{
   const {id:_id} = req.params;
    try
    {
        await product.findByIdAndRemove(_id);
        res.status(200).json({message:"Sucessfully deleted"});
    }
    catch(error)
    {
        // console.log("Customer deletion unsuccessfull due to "+error.message);
res.status(404).send(error);

    }
}

export const updateproduct = async(req,res)=>{

    const {id:_id} = req.params;
    // console.log(_id);
    // const {}
    console.log(req.imageurl);
const{imageurl,companyname,productname,productquantity,productSellingquantity,productdate}=req.body;
try{
    await product.findByIdAndUpdate(_id,{
        $set:{imageurl:imageurl,productname:productname,companyname:companyname,productquantity:productquantity,productSellingquantity:productSellingquantity,productdate:productdate},
       
    });
    
    return res.status(200).json({message:"yahhh!updated succesfully"})
}
catch(e){
    // console.log(e);
    return res.status(404).send(e);    
}


}






