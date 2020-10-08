const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Company, Employee } = require("../models/");
const { validateCompanyData } = require("../middleware/companyValidation");
const { validate } = require("../middleware/signupValidate");
const auth = require("../middleware/auth");
const manager = require("../middleware/managerAuth");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/',auth, async (req,res)=>{
    const msg = {
        to: 'jackilex91@gmail.com',
        from: 'alex.saintvictor.913@my.csun.edu', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

      
      try {
        const newmsg=await sgMail.send(msg);
        
      } catch (error) {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      }

     
})

module.exports=router;