import express from 'express'

import {Customer,deleteCustomer,getcustomerdetails,editCustomer} from '../controllers/Customers.js'
import auth from '../middlewares/auth.js';


const router = express.Router();

router.post('/customer',Customer);
router.get('/getdetails',getcustomerdetails)
router.delete('/deleteCustomer/:id',deleteCustomer)
router.patch('/editCustomer/:id',editCustomer);
export default router;

