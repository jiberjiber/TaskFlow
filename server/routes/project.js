const {Project}= require('.././models/project');
const {Scope}= require('.././models/scope');
const {Task}= require('.././models/task');
const auth=require('../middleware/auth')
const manager=require('../middleware/managerAuth')
const validation= require('./validation')
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const Fawn = require("fawn");
const moment = require('moment');
const time= require("./timestamp");
const { ObjectID } = require('mongodb');


//create projects
router.post('/',[auth,manager], async (req,res)=>{
    const {error}= validation.validCreateProject(req.body);
    if(error) return res.status(400).send('missing input or input field requirements not met')
    


 const { _id, firstName }=req.employee;
    const newProject=new Project({
title:req.body.title,
creator:firstName,
authorId:_id,
description:req.body.description,
dueDate:req.body.dueDate
    })
    
    newProject.projectCreatedOn();
    newProject.dueDateOn();
    newProject.timeRemainingOn();
    newProject.lastUpdatedDateOn();
    // console.log(req.employee)
    await newProject.save();
const projects= await Project.find({authorId:_id}).select().sort('dateCreated');
    res.send(projects)
})

//get all projects
router.get('/',[auth,manager],async (req,res)=>{
    
    const { _id }=await req.employee;

// const savedProjects= await Project.find({authorId:_id}).populate('scope').select().sort('dateCreated');
const savedProjects= await Project.find({authorId:_id}).select().sort('dateCreated');
if(!savedProjects.length) return res.status(400).send('no projects saved yet');

let data=savedProjects

let array=[]
// running throught each object of the array and passing in my timestamps methods to
//update the at each calls
data.map((key)=>{
time.dueDateOn(key);
time.timeRemainingOn(key);
// time.nestedScoping(key);
return array.push(key)
})



// console.log(array)
res.send(array)

})

//get one project
router.get('/:id',auth,async (req,res)=>{

    const getThisProject= await Project.find({_id:{$in:req.params.id}}).populate('scope').select().sort('dateCreated')
    if (!getThisProject.length>0) return res.status(400).send(`item with this id doesn't exist`)
  
// running throught each object of the array and passing in my timestamps methods to
//update the at each calls
let data=getThisProject
let array=[]
if (data){
    data.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        time.nestedScoping(key);
        return array.push(key)
        })
}
// console.log(array)
    res.send(array)
    
    })

//update one project
router.put('/:id',async(req,res)=>{
    const {error}= validation.validCreateProject(req.body);
    if(error) return res.status(400).send('missing input or input field requirements not met')

    const getThisProject= await Project.find({_id:{$in:req.params.id}}).select()
    if (!getThisProject) return res.status(400).send('The project with this id is not found')

    let data={
    title:req.body.title,
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
const findScopes= await Project.findById(req.params.id).populate('scope').select('scope -_id');


//this gets me an array of task for each scope

if(findScopes.scope.length>0){
    // let allTasks=[]
   
    findScopes.scope.map(async(x)=>{
    
    let id= x._id
        let theseTasks=await Scope.findById(id).populate('task').select('task -_id')
        let theseTasksId=await theseTasks.task[0]._id
        
    //  removing task related to scope

        await Task.findByIdAndRemove(theseTasksId)
        
        return ;
    })
    
    
}


//2 need to find scope and delete that scope schema (if any)

if(findScopes.scope.length>0){
    let array= findScopes.scope
    
 array.map(async (x)=>{
    id= x._id
       await Scope.findOneAndDelete({_id:id});
        
        return ;
    })
   
}

if (findProject){
    //3 deleting the project schema
    await Project.findByIdAndRemove(findProject._id)
    const newProjectList=await Project.find({authorId:_id}).select().sort('dateCreated');
    res.send("the project and all its elements have been deleted")
    // res.send(newProjectList)
}else{
    res.status(400).send(`this project id doesn't exist`)
}

})

module.exports = router;