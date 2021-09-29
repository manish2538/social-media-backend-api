const mongoose = require("mongoose")

//PostSchema to define parameters of a post
const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes :{
        type:Array,
        default:[]
    }
  
},
{timestamps:true} // to maintain timestamps for post
);

module.exports = mongoose.model("Post",PostSchema)