const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');


dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());


app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb");
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err=> {
    console.log("error")
    console.log(err.message);
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api',require('./routes/questions'))
app.get('/',(req,res)=>{
    res.send("Default route")
    console.log("hello");
});