import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/users.js'
import customerRoutes from './routes/customer.js'
import productroutes from './routes/product.js'
import auth from './middlewares/auth.js';

const app = express();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
res.send("This is a customder-counter api ");
})

app.use('/user',userRoutes);
app.use('/duedetails',auth,customerRoutes);
app.use('/addproduct',auth,productroutes);


const PORT = process.env.PORT || 5000

const connection_Url ="mongodb+srv://soumya:UbsQsxjlFVkIc4ju@cluster0.grb5anm.mongodb.net/?retryWrites=true&w=majority" 

mongoose.connect(connection_Url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)}))
.catch((err)=>console.log(err.message));



