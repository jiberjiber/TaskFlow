const {Project}= require('.././models/project');
const {Scope}= require('.././models/scope');
const {Task}= require('.././models/task');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const Fawn = require("fawn");
const moment = require('moment');
const time= require("./timestamp");

//create projects
router.post('/', async (req,res)=>{

  
    const newProject=new Project({
title:req.body.title,
creator:req.body.creator,
authorId:req.body.author,
description:req.body.description,
dueDate:req.body.dueDate,
    })
    
    newProject.projectCreatedOn();
    newProject.dueDateOn();
    newProject.timeRemainingOn();
    newProject.lastUpdatedDateOn();
    
    await newProject.save();

    res.send(newProject)
})

//get all projects
router.get('/',async (req,res)=>{
const savedProjects= await Project.find().select().sort('-dateCreated');

if(!savedProjects.length) return res.status(400).send('no projects saved yet');

let data=savedProjects

let array=[]
// running throught each object of the array and passing in my timestamps methods to
//update the at each calls
data.map((key)=>{
time.dueDateOn(key);
time.timeRemainingOn(key);

return array.push(key)
})



// console.log(array)
res.send(array)

})

//get one project
router.get('/:id',async (req,res)=>{
    const getThisProject= await Project.find({_id:{$in:req.params.id}}).select()
  
  
// running throught each object of the array and passing in my timestamps methods to
//update the at each calls
let data=getThisProject
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

//update one project
router.put('/:id',async(req,res)=>{
    const getThisProject= await Project.find({_id:{$in:req.params.id}}).select()
    if (!getThisProject) return res.status(400).send(error.details[0].message)

    let data={
    title:req.body.title,
    creator:req.body.creator,
    authorId:req.body.author,
    description:req.body.description,
    dueDate:req.body.dueDate,
}

// time.projectCreatedOn(data);
time.dueDateOn(data);
time.timeRemainingOn(data);
time.lastUpdatedDateOn(data);


try{
    const updatedProject= await Project.findByIdAndUpdate(req.params.id,data,{new:true});
        // console.log(updatedProject)
        res.send(updatedProject)
}catch(ex)
{
    console.log(ex)
    res.status(400).send(ex)
}    
});

// route to delete the project schema and all the child elements(scope+task)
router.delete('/:id',async (req,res)=>{
    //this gets me one project
const findProject= await Project.findById(req.params.id).select('_id');
//this gets me an array of scopes
const findScopes= await Project.findById(req.params.id).populate('scope').select('_id');

//this gets me an array of task for each scope
let allTasks=[]
if(findScopes.length>0){
    findScopes.map(x=>{
        let theseTasks= Scope.findById(x._id).populate('task').select('_id')
        allTasks.push(theseTasks);
        return;
    })

}


//deleting grandchild first (if any)
if (allTasks.length>0){
    allTasks.map(x =>{
        Task.findByIdAndDelete(x._id);
        return;
    })

}


//need to find scope and delete that scope schema (if any)
if(findScopes.length>0){
    findScopes.map((x)=>{

        Scope.findByIdAndDelete(x._id);
        return;
    })
}

//deleting the project schema
if (findProject){
    await Project.findByIdAndRemove(findProject._id)
    res.send("the project and all its elements have been deleted")
}else{
    res.status(400).send(`this project id doesn't exist`)
}

})

module.exports = router;