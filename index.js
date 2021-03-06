const express = require("express");
const app = express();
const mongoose = require("mongoose");

const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const {v4:uuidv4} = require("uuid")

//connecting database
const {MONGOURI} = require("./keys");

mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting database:",err);
})

//Routers
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const authenticate = require("./middleware/authenticate");


const PORT = process.env.PORT || 3000;



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser())

app.use(session({
    secret:uuidv4(),
    resave:true,
    saveUninitialized:true

}))

app.use("/api/users",authenticate,userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",authenticate,postRoute);


//Get request for Home Page
app.get('/',(req,res)=>{
    console.log(res.statusCode);
    res.status(200).json({
        title:"twitter Backend APIs",
        Register:"https://witter-backend-api.herokuapp.com/api/auth/register",
        Login:"https://witter-backend-api.herokuapp.com/api/auth/login",
        Logout:"https://witter-backend-api.herokuapp.com/api/auth/logout",
        Follow:"https://witter-backend-api.herokuapp.com/api/users/<followUserId>/follow",
        Unfollow:"https://witter-backend-api.herokuapp.com/api/users/<userId>/unfollow",
        CreatePost:"https://witter-backend-api.herokuapp.com/api/posts/",
        DeletePost:"https://witter-backend-api.herokuapp.com/api/posts/<PostId>",
        GetPost:"https://witter-backend-api.herokuapp.com/api/posts/<PostId>",
        LikeDislike:"https://witter-backend-api.herokuapp.com/api/posts/<PostId>/like",
    });
})


//Server Listening at Port 3000
app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT} `);
})
