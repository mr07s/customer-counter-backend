import express from "express";
import { afterPay, paymentfunc } from "../phonepay/Phonepay.js";
const router = express.Router();

router.post("/pay", paymentfunc);
router.post("/afterpay/:txnId", afterPay);

export default router;
