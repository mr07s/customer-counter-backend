import mongoose from "mongoose";
import customer from '../models/customer.js'


export const Customer = async (req, res) => {
    // const {id:userId} =req.params;
    const postcustomerdata = req.body;
    console.log(postcustomerdata);
    const customerdata = new customer(postcustomerdata);
    console.log(customerdata);
    try {

        await customerdata.save();
        res.status(200).json("Customer details submitted  sucessfully ");


    }
    catch (error) {
        console.log(error);
        res.status(409).json("Coudn't post a new customerdata sucessfully");

    }

};


export const getcustomerdetails = async (req, res) => {
    try {
        // const user =req.body;

        const customerdetails = await customer.find()
        res.status(200).json(customerdetails);


    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }





}
export const deleteCustomer = async (req, res) => {
    // console.log(req);
    // let {id:_id} = req.body;
    const { id: _id } = req.params;

    // console.log(_id);
    try {
        await customer.findByIdAndRemove(_id)
        // console.log(deleteData)
        // const customerdetails = await customer.find()
        res.status(200).json({ message: "Sucessfully deleted" });

    }
    catch (error) {
        res.send(error);
        // console.log("Customer deletion unsuccessfull due to "+error.message);
    }
}







export const editCustomer = async (req, res) => {
    const { id: _id } = req.params;
    const { Name, undertakenby, price, nextpaymentdate,purchasingdate, duedate, paidamount, volume, pages } = req.body;
    console.log(nextpaymentdate)
    try {
        await customer.findByIdAndUpdate(_id, {
            $set: { Name: Name, undertakenby: undertakenby, price: price,nextpaymentdate, purchasingdate: purchasingdate, duedate: duedate, paidamount: paidamount, volume, pages },
            // $set:{undertakenby:undertakenby},
            // $set:{price:price},
            // $set:{purchasingdate:purchasingdate},
            // $set:{duedate:duedate},
        });
        console.log("nextpaymentdate")
        console.log(req.body)

        return res.status(200).json({ message: "yahhh!updated succesfully" })
    }
    catch (e) {
        console.log(e);
        return res.status(404).send(e);
    }


}







