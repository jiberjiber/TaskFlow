const jwt=require('jsonwebtoken')
require("dotenv").config();

function auth(req,res,next){
    const token= req.header("x-auth-token")
    if(! token)return res.status(401).send('acces denied missing token')
try{

    const verifiedToken= jwt.verify(token,process.env.SECRET)
    //this verifiedtoken returns the data object set for gerating token - this is the payload from jwt
    req.employee= verifiedToken;

    //req.employee = to object data set up in the employee schema
    //use next to pass control to the next middleware function
    next()
}catch(ex)
{
    res.status(400).send('invalid token');

}   

}

module.exports= auth;