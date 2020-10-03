const mongoose= require('mongoose');
const moment = require('moment');

const ScopeSchema= new mongoose.Schema({
    scopeName:{
        type:String,
        trim: true,
        required:true
    },
    task:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
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
    scopeCreated:{
        type:String,
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }

});

//setting custom methods to be called when updating the scope
ScopeSchema.methods.scopeCreatedOn = function() {
    
    this.scopeCreated = moment().format('MMMM Do YYYY');
  
    return this.scopeCreated;
  };

  ScopeSchema.methods.dueDateOn = function() {
    this.dueDate = moment(this.dueDate,'MMMM Do YYYY').format('MMMM Do YYYY');
  
    return this.dueDate;
  };



  ScopeSchema.methods.timeRemainingOn = function() {
      
    this.timeRemaining = moment(this.dueDate,'MMMM Do YYYY').fromNow();
  
    return this.timeRemaining;
  };

  ScopeSchema.methods.lastUpdatedDateOn = function() {
    this.lastUpdated = moment().format('MMMM Do YYYY');
  
    return this.lastUpdated;
  };

  ScopeSchema.methods.returnid = function(){
      
      return this._id
  }


  const Scope = mongoose.model("Scope", ScopeSchema);

  exports.Scope = Scope;
