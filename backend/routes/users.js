const User =  require("../models/User")
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Register User
router.post("/register", async(req,res)=>{
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        // save user n respond
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        // console.log(err);
        res.status(500).json(err);
    }
})

// User Login
// router.post("/login", async(req,res)=>{
//     try {
//         //find user
//         const user = await User.findOne({ username: req.body.username });
//         !user && res.status(400).json("Wrong username or password");
    
//         //validate password
//         const validPassword = await bcrypt.compare(
//           req.body.password,
//           user.password
//         );
//         !validPassword && res.status(400).json("Wrong username or password");
    
//         //send response
//         // res.status(200).json({ _id: user._id, username: user.username });
//         res.status(200).json(user);
//       } catch (err) {
//         res.status(500).json(err);
//       }
// })



// User Login
 router.post("/login", async(req,res)=>{
     const {username, password}= req.body;
     try
     {
         const user = await User.findOne({username})
         if(user){
             const validpassword = await bcrypt.compare(password,user.password)
             if(validpassword){
                 res.status(200).json(user)
             } else {
                 res.status(400).json({error:"Invalid email or password"})
             }
         }
         else{
             return res.status(400).json(error)
         }
     } 
     catch(error){
         return res.status(400).json(error);
     }
 });



module.exports =router;