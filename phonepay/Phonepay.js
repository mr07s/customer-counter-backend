import axios from "axios";
import sha256 from "sha256";
import crypto from "crypto";
// import uniqueId from "uniqueid";
import { v4 as uuidv4, v6 as uuidv6 } from "uuid";

const marchentTransId = uuidv4().substring(0, 20);
const merchantId = "PGTESTPAYUAT86";
const merchantUserId = "MUID123";
console.log(typeof marchentTransId);
console.log("marchentTransId");

export const paymentfunc = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);
    console.log("Hii");
    const data = {
      merchantId,
      merchantTransactionId: marchentTransId,
      merchantUserId,
      //converting ruppes in
      amount: 100 * 100,
      redirectUrl: `http://localhost:3000/inventory`,
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const base64json = Buffer.from(payload).toString("base64");
    console.log(base64json);
    const SALT_INDEX = 1;
    const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
    // //  SHA256(Base64 encoded payload + “/pg/v1/pay” + salt key) + ### + salt index

    const checksum =
      sha256(base64json + "/pg/v1/pay" + SALT_KEY) + "###" + SALT_INDEX;

    // console.log(checksum);

    const options = {
      method: "post",
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: base64json,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(
        //   "****************************here************************************"
        // );
        // console.log(response);
        return res.send(response.data);
      })
      .catch(function (error) {
        // console.log(
        //   "****************************error************************************"
        // );
        // console.log(error);
        return res.json(error);
      });
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
};

export const afterPay = async (req, res) => {
  try {
    // console.log(req.data);
    const marchentTransId = req.params.txnId;
    const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
    const SALT_INDEX = 1;

    const checkSum =
      sha256(`/pg/v1/status/${merchantId}/${marchentTransId}` + SALT_KEY) +
      "###" +
      SALT_INDEX;

    const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${marchentTransId}`;

    const options = {
      method: "get",
      url,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
        "X-MERCHANT-ID": merchantId,
      },
    };
    try {
      const response = await axios.request(options);

      // console.log(response);
      // console.log(response.data.code);

      // if (response.data.code == "PAYMENT_SUCCESS") {
      //   //write databse logic here.

      //   console.log("Payment Successfull");

      //   const url = "http://localhost:3000/payment/success";
      //   return res.redirect(url);
      // }
      // if (response.data.code == "PAYMENT_PENDING") {
      //   const url = "http://localhost:3000/payment/pending";
      //   return res.redirect(url);
      // } else {
      //   const url = "http://localhost:3000/payment/failed";
      //   return res.redirect(url);
      // }
      return res.json(response.data.code);
    } catch (e) {
      res.status(500).json({
        msg: "Error checking payment status",
        status: "error",
        error: error.message,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error checking payment status",
      status: "error",
      error: error.message,
    });
  }
};

export const callback = (req, res) => {
  console.log(req);
  console.log("Call back called");
};
