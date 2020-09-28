const {Task}= require('.././models/task');
const {Scope}= require('.././models/scope');
const {Project}= require('.././models/project');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const time= require("./timestamp");

router.post('/', async (req,res)=>{

  
    const newTask=new Task({
task:req.body.task,
description:req.body.description,
dueDate:req.body.dueDate,
    })
    
    newTask.taskCreatedOn();
    newTask.dueDateOn();
    newTask.timeRemainingOn();
    newTask.lastUpdatedDateOn();
    let id=await newTask.returnid()

    await newTask.save();
    const scope=await Scope.findByIdAndUpdate(req.body.taskId,
        {$push:{"task":id}},{new: true}
        )
    

    res.send(newTask)
})

router.get("/", async (req,res)=>{
    const savedTasks= await Task.find().sort('dateCreated');

    if(!savedTasks.length>0) return res.status(400).send('no task saved yet');

    let data=savedTasks

    let array=[];
    // running throught each object of the array and passing in my timestamps methods to
//update due date at each calls
data.map((key)=>{
    time.dueDateOn(key);
    time.timeRemainingOn(key);
    
    return array.push(key)
    })

    res.send(array) 

})


router.get("/:id", async (req,res)=>{
    const getThisTask= await Task.find({_id:{$in:req.params.id}}).select();
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

router.put('/:id', async (req,res)=>{
    const getThisTask= await Task.find({_id:{$in:req.params.id}}).select();

    if (!getThisTask.length>0) return res.status(400).send('The Task with this id is not found');

    let data={
task:req.body.task,
description:req.body.description,
dueDate:req.body.dueDate,
    }

time.dueDateOn(data);
time.timeRemainingOn(data);
time.lastUpdatedDateOn(data);

try{
const updatedTask= await Task.findByIdAndUpdate(req.params.id,data,{new:true});

res.send(updatedTask)


}catch(ex){
    res.status(400).send(ex)
}

})

router.delete('/:id',async (req,res)=>{

    const findTask=await Task.findById(req.params.id).select('_id');

    const findScope= await Scope.findById(req.body.scopeId).select('task -_id');

   console.log(findTask)

    if(findScope.task.length>0){
        let newArray=[];

        let taskId=req.params.id;

        let array=findScope.task
        await array.map((x)=>{
            if(x==taskId){
                return
            }else{
                newArray.push(x)
            }
            
            return newArray
        })
        let replace= await Scope.update({_id:req.body.scopeId},{$set:{task:newArray}})
    }
    if(findTask){
        await Task.findByIdAndRemove(findTask._id);
        res.send("the task and all its elements have been deleted")
    }else{
        res.status(400).send(`this task id doesn't exist`)
    }


})


module.exports = router;