const moment = require('moment');

module.exports={
  
///functions
projectCreatedOn: function(data) {
    
    data.projectCreated = moment().format('MMMM Do YYYY');
  
    return data.projectCreated;
  },

dueDateOn: function(data) {
    data.dueDate = moment(data.dueDate,'MMMM Do YYYY').format('MMMM Do YYYY');
  
    return data.dueDate;
  },


timeRemainingOn: function(data) {
      
    data.timeRemaining = moment(data.dueDate,'MMMM Do YYYY').fromNow();
  
    return data.timeRemaining;
  },

lastUpdatedDateOn: function(data) {
    data.lastUpdated = moment().format('MMMM Do YYYY');
  
    return data.lastUpdated;
  }



}