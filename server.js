import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';

const app = express();

const PORT = process.env.PORT || 8000;
//const PORT = 6000;
// middlewares
app.use(express.json());
app.use("/api", router);

mongoose.connect("mongodb+srv://esp1234:esp1234@cluster0.afpexgq.mongodb.net/?retryWrites=true&w=majority")
.then(()=> app.listen(PORT))
.then(()=> 
    console.log("Connected to database and listening on port", PORT)
)
.catch((err)=> console.log(err));