
//Custom middleware to check user isLoggedIn or not.

const auth = (req,res,next) =>{
try{

if(req.session.user){
    // console.log("inmiddleware");
    next();   

}else{
    res.status(400).json("Please, Login first");
}
}catch(err){
    res.status(500).json(err);
}


}

module.exports = auth;