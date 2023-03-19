import express  from "express";
import {deletedetails, getProductDetails, productdetails,updateproduct} from '../controllers/product.js'


const router =express.Router();

router.post('/pdetails',productdetails);
router.get('/getpdetails',getProductDetails)
router.delete('/deleteproduct/:id',deletedetails)
router.patch('/updateproduct/:id',updateproduct)








export default router;



