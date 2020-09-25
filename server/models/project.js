const mongoose= require('mongoose');

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
    description:{
        type:String,
        trim: true,
        required:true
    },
    scope:[{
        type:String
    }],
    detailedScope:[{
        type:String
    }],
    isComplete:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    },
    dateSaved:{
        type:Date,
        default:Date.now
    },
    lastUpdated: Date,

});


//setting custom methods to be called when updating the project
ProjectSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
  
    return this.lastUpdated;
  };



  const Project = mongoose.model("Project", ProjectSchema);