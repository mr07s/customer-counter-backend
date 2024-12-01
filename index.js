import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import phonepayroutes from "./routes/phonepayroute.js";
import userRoutes from "./routes/users.js";
import customerRoutes from "./routes/customer.js";
import productroutes from "./routes/product.js";
// import phonepayroutes from "./routes/phonepayroute.js";

import auth from "./middlewares/auth.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ "Access-Control-Allow-Origin": "*" }));

app.get("/", (req, res) => {
  res.send("This is a customder-counter api ");
});

app.use("/user", userRoutes);
app.use("/duedetails", customerRoutes);
app.use("/addproduct", productroutes);
app.use("/phonepay", phonepayroutes);

const PORT = process.env.PORT || 5000;

const connection_Url = process.env.CONNECTION_URL;

mongoose
  .connect(connection_Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
