import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/users.js'
import customerRoutes from './routes/customer.js'
import productroutes from './routes/product.js'
import auth from './middlewares/auth.js';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors({"Access-Control-Allow-Origin":"*"}));

app.get('/',(req,res)=>{
res.send("This is a customder-counter api ");
})

app.use('/user',userRoutes);
app.use('/duedetails',customerRoutes);
app.use('/addproduct',productroutes);


const PORT = process.env.PORT || 5000

const connection_Url ="mongodb+srv://soumya:UbsQsxjlFVkIc4ju@cluster0.grb5anm.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connection_Url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)}))
.catch((err)=>console.log(err.message));