

//second middleware function
function admin(req,res,next){
console.log(req.isManager,'test')
    if(!req.employee.isManager) return res.status(403).send('your access was denied')
   
    next()
}


module.exports= admin;