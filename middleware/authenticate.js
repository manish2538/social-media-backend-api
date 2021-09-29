
//Custom middleware to check user isLoggedIn or not.

const auth = (req,res,next) =>{
try{

if(req.session.user && req.session.user.isLoggedIn==true){
    
    next();   

}else{
    res.status(400).json("Please, Login first");
}
}catch(err){
    res.status(500).json(err);
}


}

module.exports = auth;