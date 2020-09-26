
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

//Schema
const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },
  ],
  employees: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    managers: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
      },
    ],
    
  
});

 //Model
const Company = mongoose.model("Company", CompanySchema);



module.exports = Company;
