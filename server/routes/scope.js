const {Scope}= require('.././models/scope');
const {Project}= require('.././models/project');
const {Task}= require('.././models/task');
const { Team } = require("../models");
const auth=require('../middleware/auth')
const manager=require('../middleware/managerAuth')
const validation= require('./validation')
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router()
const time= require("./timestamp");
const Joi=require('joi')


router.post('/',[auth,manager], async (req,res)=>{
    
    const {error}= validation.validScope(req.body);
    if(error) return res.status(400).send('missing input or input field requirements not met')
    
   //checkdudates
  const thisProject= await Project.findById(req.body.projectId).select('dueDate -_id')
  
//   const check=await validation.checkProjectDueDate(req.body.dueDate,thisProject.dueDate)
//     if(check) return res.status(403).send('scope due date should be within the project timeframe')
    const { _id}=req.employee;
    const newScope=new Scope({
scopeName:req.body.scopeName,
dueDate:req.body.dueDate,
authorId:_id
    })
    
    newScope.scopeCreatedOn();
    newScope.dueDateOn();
    newScope.timeRemainingOn();
    newScope.lastUpdatedDateOn();
   let id=await newScope.returnid()
   
    // console.log(newScope._id)
    await newScope.save();

    
   const project= await Project.findByIdAndUpdate(req.body.projectId,
        {$push:{"scope":id}},{new: true}
        )
        
    const getThisProject= await Project.findById(req.body.projectId).populate('scope').select().sort('dateCreated');
    // res.send(newScope)
    res.send(getThisProject)
})


//cannot use this call - just for testing
router.get("/",[auth,manager], async (req,res)=>{
    
//     const savedScopes= await Scope.find().select().sort('dateCreated');
//     if (!savedScopes.length>0) return res.status(400).send('no scopes saved yet');

    


    
//     let data=savedScopes

//     let array=[];
// // running throught each object of the array and passing in my timestamps methods to
// //update the at each calls
// data.map((key)=>{
//     time.dueDateOn(key);
//     time.timeRemainingOn(key);
    
//     return array.push(key)
//     })


//     res.send(array) 
})

///cant use use... for testing only
router.get('/:id',async (req,res)=>{
//     const getThisScope= await Scope.find({_id:{$in:req.params.id}}).select();
//     if (!getThisScope.length>0) return res.status(400).send(`item with this id doesn't exist`)
// let data=getThisScope
// let array=[]
// if (data){
//     data.map((key)=>{
//         time.dueDateOn(key);
//         time.timeRemainingOn(key);
//         return array.push(key)
//         })
// }
// // console.log(array)
//     res.send(array)
})

//this gets you all the scopes with project id - this returns all scopes
//for this project
router.get('/one/:id',async (req,res)=>{

    const getThisScope= await Scope.find({_id:{$in:req.params.id}}).populate('task').select().sort('dateCreated');
    // const getThisScope= await Scope.find({_id:{$in:req.params.id}}).select();
    if (!getThisScope.length>0) return res.status(400).send(`item with this id doesn't exist`)
// console.log(getThisScope)

let data=getThisScope
let array=[]
if (data){
    data.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        time.nestedTask(key)
        return array.push(key)
        })
}

    res.send(array)
})

router.put('/one/:id',async(req,res)=>{    
try{

    const {error}= validation.validScope(req.body);
    if(error) return res.status(400).send('missing input or input field requirements not met')
    //checking if scope exist
    const checkThisScope= await Scope.find({_id:{$in:req.params.id}}).select()
    if (!checkThisScope.length>0) return res.status(400).send('The Scope with this id is not found')
    
    let data={
        scopeName:req.body.scopeName,
        dueDate:req.body.dueDate
    }
    time.lastUpdatedDateOn(data)

    //upating the scope with given data
const updatedScope=await Scope.findByIdAndUpdate(req.params.id,data,{new:true});

//getting the updated data/scope and updating dates
const getThisScope= await Scope.find({_id:{$in:req.params.id}}).populate('task').select().sort('dateCreated');

let myData=await getThisScope
let array=[]
if (myData){
    myData.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        time.nestedTask(key)
        return array.push(key)
        })
}


    res.send(array)

// res.send(updatedScope)
}catch(ex){
    
    res.status(400).send(ex)
}

})

/// route to delete the Scope schema and all the child elements(task)
router.delete('/one/:id',async (req,res)=>{
        //this gets me one scope (id)
    const findScope= await Scope.findById(req.params.id).select();
//this gets me an array of tasks (children of scopes)
    const findTasks=await Scope.findById(req.params.id).populate('task').select('task -_id');
    const findProject=await  Project.find({scope:{$in:req.params.id}}).select()
    
    let projectId=await findProject[0]._id
    
   
//deleting grandchild first (if any)
if (findTasks.task.length>0){
    
   findTasks.task.map(async (x)=>{
    let id= x._id
    
        await Task.findOneAndDelete({_id:id});
        return;
    })

}

//deleting the reference id from project 
if (findProject[0].scope.length>0){
    let newArray=[]
    let scopeId=req.params.id;
    let array=findProject[0].scope
   await array.map((x)=>{
        if(x== scopeId){
            return
        }else{
            newArray.push(x)
        }

        return newArray
    })
    
    let replace= await Project.update({_id:projectId},{$set:{scope:newArray}})
}

if (findScope){
    await Scope.findByIdAndRemove(findScope._id)

    //sending back updated project with remaining scopes
    // const updatedProjScope= await Project.findById(projectId).populate('scope').select().sort('dateCreated'); 
    res.send("the scope and all its elements have been deleted")
    // res.send(updatedProjScope)
}else{
    res.status(400).send(`this scope id doesn't exist`)
}



})

router.post('/toteam',[auth,manager], async (req,res)=>{

    const getTeam= await Team.findById(req.body.teamId).select()
    if (!getTeam) return res.status(400).send(`this team doesn't exist`)

    const findScope= await Scope.find({_id:req.body.scopeId}).select();
    if (!findScope) return res.status(400).send(`this scope doesn't exist`)

    const assignedScope= await Team.findByIdAndUpdate(req.body.teamId,{$push:{"assignedScope":req.body.scopeId}},{new: true})
    res.send(`scope added to ${getTeam.name}`)
})

module.exports = router;