const router = require("express").Router();
const User = require("../models/User");


const bcrypt = require("bcrypt");


//1. Basic  Functionality

//1.a. Register a new user
router.post('/register', async (req, res) => {


    try {
        //checking user already exist in database 
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {
            res.status(404).json("User already exist");
        }

        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })

        //save user details in database 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }

});

//Basic Functionality
//1.b.LOGIN

router.post("/login", async (req, res) => {
   
    try {
        const user = await User.findOne({ email: req.body.email }); //find userEmail in database
        if (!user) {
            res.status(404).json("User not found");
        }
        else {
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            
            if (!validPassword) {
                res.status(400).json("Invalid Credentials");
            }
            else {
                //saving user session 
                req.session.user = {email:req.body.email,isLoggedIn:true};
              
                req.session.save();
            
                res.status(200).json({"user":"Logged In successfully","details":user});
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


// adding logout functionality

router.get('/logout', (req, res) => {
  //destory session will destroy the session making user logging out 
    req.session.destroy((err) => { //todo->instead of destroy session use isLoggedIn = false 
        if (err) {
            res.status(500).json(err)
        }
        else {
            res.status(200).json("logout successfully");
        }

    })
});
  

module.exports = router;