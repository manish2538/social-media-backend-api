const router = require("express").Router();
const User = require("../models/User");


//2 Extended Functionality

//2.A follow a user
router.put("/:id/follow",async(req,res)=>{

    if(req.body.userId !== req.params.id){  // is user trying to follow himself?
        if(req.session.user._id===req.body.userId){
        
        try{
            const user = await User.findById(req.params.id); // finding userId in database
            const currentUser = await User.findById(req.body.userId); // finding currentuser who wants to follow/unfollow
            

            //if user doesn't follow yet
            if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({$push:{followers:req.body.userId}});
                    await currentUser.updateOne({$push :{followings:req.params.id}});
                    res.status(200).json("User has been followed");
                }else{
                res.status(401).json("You already follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else {
        res.status(403).json("you can't follow this user from someone else account")
    }
    }else{
        res.status(403).json("You can't follow yourself");
    }
})


//2.A unfollow a user

router.put("/:id/unfollow",async(req,res)=>{
    if(req.session.user._id===req.body.userId){

    if(req.body.userId !== req.params.id){
      
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if(user.followers.includes(req.body.userId)){
                    await user.updateOne({$pull:{followers:req.body.userId}});
                    await currentUser.updateOne({$pull :{followings:req.params.id}});
                    res.status(200).json("User has been unfollowed");
                }else{
                res.status(401).json("you don't follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can't unfollow yourself");
    }
}else {
    res.status(403).json("you can't unfollow from someone else account");
}
})



module.exports = router;