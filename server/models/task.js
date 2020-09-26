const mongoose= require('mongoose');
const moment = require('moment');

const ScopeSchema= new mongoose.Schema({
    title:{
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
    dateSaved:{
        type:Date,
        default:Date.now
    },
    lastUpdated: Date,
    timeRemaining:{
        type:Number
    }

});

//setting custom methods to be called when updating the project
ScopeSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
  
    return this.lastUpdated;
  };



//   const Scope = mongoose.model("Scope", ScopeSchema);