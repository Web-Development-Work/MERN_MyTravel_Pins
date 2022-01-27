const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const userRoute = require("./routes/users");
const pinRoute =  require("./routes/pins")

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());


// Connect Database
mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>console.log("MongoDB Database Connected"))
    .catch(err=>console.log(err));

// routes
app.use("/api/users",userRoute);
app.use("/api/pins",pinRoute);


app.get("/",(req,res)=>{
    res.send("APi working")
})

const port= process.env.PORT || 8800;

app.listen(port , ()=>{
    console.log(`Server Running on Port ${port}`);
})