const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");



// 2 Extended Functionality

//2.B.a create a post
router.post("/",async (req,res)=>{
    //checking is logged user creating a post or any other user.
   if(req.session.user._id===req.body.userId){
   
   try{
        const newPost = new Post(req.body)

        const savedPost = await newPost.save(); //saving new post in database
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
   }
   else {
       res.status(403).json("you can't post from another  account");
   }

})
// 2 Extended Functionality
//2.B.b delete a post
router.delete('/:id',async (req,res)=>{
   
   try {
    const post = await Post.findById(req.params.id); //find post by id if exist or not
    
    if(post.userId === req.body.userId){  //cheking that is user trying to delete someone else post
         await post.deleteOne();
        res.status(200).json("this post has been deleted")
    } else {
        res.status(403).json("you can delete only your post")
    }
} catch (err) {
    res.status(500).json(err);
}
  
});

//2. Extended Functionality
//2.B.c get a post
router.get("/:id",async (req,res) =>{
    
    try{    
        
        const post = await Post.findById(req.params.id); //find post and then give response
        if(post===null) {
           return res.status(400).json("post doesn't exist")
        }
        res.status(200).json(post);
    } catch (err){
        res.status(500).json(err);
    }

})

//3.Extra Credit

//3.a like/dislike a post
router.put("/:id/like",async (req,res)=>{
     //only logged user can like or dislike a post
   if(req.session.user._id===req.body.userId){
    try{
        const post = await Post.findById(req.params.id); //finding post which we need to like or dislike
            //making a check, that user already  like the post 


        if(!post.likes.includes(req.body.userId)){  //user can't like a post more than one time
            await post.updateOne({$push: {likes:req.body.userId}});
            res.status(200).json("post has been liked");
        }

            //if already liked the post then again it will dislike the post i.e remove previous like
        else {    
            await post.updateOne({$pull: {likes:req.body.userId}});
            res.status(200).json("post has been disliked");
        }

    }catch(err){
        res.status(500).json(err);
    }
}
else {
    res.status(403).json("you can't like post from someone else account")
}

})


module.exports = router; 