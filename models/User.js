const mongoose = require("mongoose")


//UserSchema to define parameters of user
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:5,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:40,
        unique:true,
    },
    password:{
        type:String,
        min:4,
        required:true,
        
    },profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema)