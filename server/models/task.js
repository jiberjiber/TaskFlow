const mongoose= require('mongoose');
const moment = require('moment');

const TaskSchema= new mongoose.Schema({
    task:{
        type:String,
        trim: true,
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Manager'
    },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }],
    description:{
        type:String,
        trim: true,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false,
    },
    dueDate:{
        type:String,
        required:true
    },
    lastUpdated: {
        type:String,
    },
    timeRemaining:{
        type:String
    },
    taskCreated:{
        type:String,
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
    

});

//setting custom methods to be called when updating the Task
TaskSchema.methods.taskCreatedOn = function() {
    
    this.tasktCreated = moment().format('MMMM Do YYYY');
  
    return this.taskCreated;
  };

  TaskSchema.methods.dueDateOn = function() {
    this.dueDate = moment(this.dueDate,'MMMM Do YYYY').format('MMMM Do YYYY');
  
    return this.dueDate;
  };



  TaskSchema.methods.timeRemainingOn = function() {
      
    this.timeRemaining = moment(this.dueDate,'MMMM Do YYYY').fromNow();
  
    return this.timeRemaining;
  };

  TaskSchema.methods.lastUpdatedDateOn = function() {
    this.lastUpdated = moment().format('MMMM Do YYYY');
  
    return this.lastUpdated;
  };

  TaskSchema.methods.returnid = function(){
      
    return this._id
}
  const Task = mongoose.model("Task", TaskSchema);

  exports.Task = Task;

