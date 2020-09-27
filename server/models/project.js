const mongoose= require('mongoose');
const moment = require('moment');

// //testing schema on this file
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
// .then(()=> console.log('connected to Mongodb'))
// .catch(err=> console.log('could not connect to MongoDb...', err))

const ProjectSchema= new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Manager'
    },
    description:{
        type:String,
        trim: true,
        required:true
    },
    scope:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Scope',
        autopopulate: true,
        required:true
    }],
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
    projectCreated:{
        type:String,
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }

});


//setting custom methods to be called when updating the project

//taking the date string an format it for moment
ProjectSchema.methods.projectCreatedOn = function() {
    
    this.projectCreated = moment().format('MMMM Do YYYY');
  
    return this.projectCreated;
  };

  ProjectSchema.methods.dueDateOn = function() {
    this.dueDate = moment(this.dueDate,'MMMM Do YYYY').format('MMMM Do YYYY');
  
    return this.dueDate;
  };



  ProjectSchema.methods.timeRemainingOn = function() {
      
    this.timeRemaining = moment(this.dueDate,'MMMM Do YYYY').fromNow();
  
    return this.timeRemaining;
  };

  ProjectSchema.methods.lastUpdatedDateOn = function() {
    this.lastUpdated = moment().format('MMMM Do YYYY');
  
    return this.lastUpdated;
  };

  const Project = mongoose.model("Project", ProjectSchema);

   
exports.Project = Project;