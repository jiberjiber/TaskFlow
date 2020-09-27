const {Scope}= require('.././models/scope');
const {Project}= require('.././models/project');
const {Task}= require('.././models/task');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router()
const time= require("./timestamp");


router.post('/', async (req,res)=>{


    const newScope=new Scope({
scopeName:req.body.scopeName,
dueDate:req.body.dueDate
    })
    
    newScope.scopeCreatedOn();
    newScope.dueDateOn();
    newScope.timeRemainingOn();
    newScope.lastUpdatedDateOn();
    
    await newScope.save();
   const project= await Project.findByIdAndUpdate(req.body.projectId,
        {$push:{"scope":newScope._id}},{new: true}
        )
// console.log(req.body.projectId)
    res.send(newScope)
})

router.get('/', async (req,res)=>{

    const savedScopes= await Scope.find().select().sort('-dateCreated');
    console.log(savedScopes)
    if (!savedScopes) return res.status(400).send('no scopes saved yet');

    let data=savedScopes

    let array=[];
// running throught each object of the array and passing in my timestamps methods to
//update the at each calls
data.map((key)=>{
    time.dueDateOn(key);
    time.timeRemainingOn(key);
    
    return array.push(key)
    })

    res.send(savedScopes) 
})

router.get('/:id',async (req,res)=>{
    const getThisScope= await Scope.find({_id:{$in:req.params.id}}).select();

let data=getThisScope
let array=[]
if (data){
    data.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        return array.push(key)
        })
}
// console.log(array)
    res.send(array)
})

router.put('/:id',async(req,res)=>{
const getThisScope= await Scope.find({_id:{$in:req.params.id}}).select()
if (!getThisScope) return res.status(400).send(error.details[0].message)

let data={
    scopeName:req.body.scopeName,
    dueDate:req.body.dueDate
}

time.dueDateOn(data);
time.timeRemainingOn(data);
time.lastUpdatedDateOn(data);
try{
const updatedScope=await Scope.findByIdAndUpdate(req.params.id,data,{new:true});

res.send(updatedScope)

}catch(ex){
    console.log(ex)
    res.status(400).send(ex)
}

})

/// route to delete the Scope schema and all the child elements(task)
router.delete('/:id',async (req,res)=>{
        //this gets me one scope (id)
    const findScope= await Scope.findById(req.params.id).select('_id');
//this gets me an array of tasks (children of scopes)
    const findTasks=await Scope.findById(req.params.id).populate('task').select('_id');

    //deleting grandchild first (if any)
if (findTasks.length>0){
    findTasks.map(x =>{
        Task.findByIdAndDelete(x._id);
        return;
    })

}
// console.log(findScope._id)
//deleting the scope schema
if (findScope){
    await Scope.findByIdAndRemove(findScope._id)

    res.send("the scope and all its elements have been deleted")
}else{
    res.status(400).send(`this scope id doesn't exist`)
}

})


module.exports = router;