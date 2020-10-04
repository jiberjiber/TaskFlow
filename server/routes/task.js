const {Task}= require('.././models/task');
const {Scope}= require('.././models/scope');
const {Project}= require('.././models/project');
const auth=require('../middleware/auth')
const manager=require('../middleware/managerAuth') 
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const time= require("./timestamp");

router.post('/',[auth,manager], async (req,res)=>{

    const { _id}=req.employee;
const newTask=new Task({
task:req.body.task,
description:req.body.description,
dueDate:req.body.dueDate,
authorId:_id
    })
    
    newTask.taskCreatedOn();
    newTask.dueDateOn();
    newTask.timeRemainingOn();
    newTask.lastUpdatedDateOn();
    let id=await newTask.returnid()

    await newTask.save();
    const scope=await Scope.findByIdAndUpdate(req.body.scopeId,
        {$push:{"task":id}},{new: true}
        )
    
    const getThisScope= await Scope.findById(req.body.scopeId).populate('task').select().sort('dateCreated');
    res.send(getThisScope)
})

//cannot use this call - just for testing
router.get("/", async (req,res)=>{
//     const savedTasks= await Task.find().sort('dateCreated');

//     if(!savedTasks.length>0) return res.status(400).send('no task saved yet');

//     let data=savedTasks

//     let array=[];
//     // running throught each object of the array and passing in my timestamps methods to
// //update due date at each calls
// data.map((key)=>{
//     time.dueDateOn(key);
//     time.timeRemainingOn(key);
    
//     return array.push(key)
//     })

//     res.send(array) 

})

///cant use ... for testing only
router.get("/:id", async (req,res)=>{
//     const getThisTask= await Task.find({_id:{$in:req.params.id}}).select();
//     if (!getThisTask.length>0) return res.status(400).send('no task with this id');

//     let data=getThisTask

//     let array=[]
// if (data){
//     data.map((key)=>{
//         time.dueDateOn(key);
//         time.timeRemainingOn(key);
//         return array.push(key)
//         })
// }

// res.send(array)
})

router.get("/one/:id", async (req,res)=>{
    const getThisTask= await Task.find({_id:{$in:req.params.id}}).populate('assignedTo').select().sort('dateCreated');;
    if (!getThisTask.length>0) return res.status(400).send('no task with this id');

    let data=getThisTask

    let array=[]
if (data){
    data.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        return array.push(key)
        })
}

res.send(array)
})



router.put('/one/:id', async (req,res)=>{
    try{
    const checkThisTask= await Task.find({_id:{$in:req.params.id}}).select();

    if (!checkThisTask.length>0) return res.status(400).send('The Task with this id is not found');

    let data={
task:req.body.task,
description:req.body.description,
dueDate:req.body.dueDate,
    }
time.lastUpdatedDateOn(data);
// time.dueDateOn(data);
// time.timeRemainingOn(data);
const updatedTask= await Task.findByIdAndUpdate(req.params.id,data,{new:true});

const getThisTask= await Task.find({_id:{$in:req.params.id}}).populate('assignedTo').select().sort('dateCreated');

let myData=await getThisTask
let array=[]
if (myData){
    myData.map((key)=>{
        time.dueDateOn(key);
        time.timeRemainingOn(key);
        return array.push(key)
        })
}

    res.send(array)
}catch(ex){
    res.status(400).send(ex)
}

})

router.delete('/one/:id',async (req,res)=>{
 
    const findTask=await Task.findById(req.params.id).select('_id');
    const findScope= await Scope.find({task:{$in:req.params.id}}).select();
    // const findScope= await Scope.findById(req.body.scopeId).select('task -_id');

    let scopeId=await findScope[0]._id
    
    if(findScope[0].task.length>0){
        let newArray=[];

        let taskId=req.params.id;

        let array=findScope[0].task
        await array.map((x)=>{
            if(x==taskId){
                return
            }else{
                newArray.push(x)
            }
            
            return newArray
        })
        
        let replace= await Scope.update({_id:scopeId},{$set:{task:newArray}})
    }
    if(findTask){
        
        await Task.findByIdAndRemove(findTask._id);
        //sending scope with updated tasks
        const updateScopeTask= await Scope.findById(scopeId).populate('task').select().sort('dateCreated');
        res.send(updateScopeTask)
    }else{
        res.status(400).send(`this task id doesn't exist`)
    }


})


module.exports = router;