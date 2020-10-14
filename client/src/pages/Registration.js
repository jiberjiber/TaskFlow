//manager registration form
//register themselves as the manager of a company they create

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container } from '@material-ui/core'


//for a new member that is creating a company to be manager of
const Registration = () => {
    const [RegisterForm, setRegisterForm] = useState({
        isManager: false,//false start value to ensure isManager is interacted with and sent with data
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
        name: ""
    })
    
    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setRegisterForm({ ...RegisterForm, [name]: value });

    }
   
    const onRadioChange = (e) => {
        console.log((e.target.value));
        //setRegisterForm.isManager = e.target.value
        if (e.target.value === false) {
            alert("Please contact your project manager to receive your login credentials and create your employee account.")
        }
        else {
            RegisterForm.isManager = e.target.value
        }
    }
    function checkPassword() {
      let val1=RegisterForm.password
       let val2=RegisterForm.confirmPassword
        if (val1 === val2){
            setRegisterForm(RegisterForm.password = val1);
        }
        else {
            return (alert("Passwords Do Not Match, Please Re-enter To Submit"))
        }
        }

    const onFormSubmit = (event) => {
        event.preventDefault()
        //console.log(RegisterForm)
        checkPassword();
        //check to see 
        if (RegisterForm.isManager === true) {
            //this is the create post for a new company
            axios.post('/api/:create', {
                employees: {//create first employee
                    firstName: RegisterForm.firstName,
                    lastName: RegisterForm.lastName,
                    username: RegisterForm.username,
                    email: RegisterForm.email,
                    password: RegisterForm.password,
                    isManager: RegisterForm.boolean
                },
                name: RegisterForm.name,
                
            })
                //pull data from this response
                .then(function (response) {
                    console.log("Yay it worked",response);
                })
                .catch(function (error) {
                    console.log("not successful",error);
                })
            }
               else  {
                   return alert("You must be a manager to create an account")}
        


    const clearState = {
       
        firstName: "",
        lastName: "",
        username: "",
        isManager: "",
        email: "",
        password: "",
        confirmPassword:"",
        name: ""
    }

    setRegisterForm({ ...clearState })
    }


    return (
        <Container>
        <Card styles={{ marginLeft: 100 }}>
            <CardContent>
            <div className="jumbotron">
        <h1 className="display-4">Welcome to TaskFlow!</h1>
        <p className="lead">Get started with smoother project management by providing your details below.</p>
      
                <form >
                   
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            onChange={handleFormChange}
                            name="firstName"
                            value={RegisterForm.firstName}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            onChange={handleFormChange}
                            name="lastName"
                            value={RegisterForm.lastName}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <br/>
                        <small>This will be another way for other users to identify you.</small>
                        <input
                            onChange={handleFormChange}
                            name="username"
                            value={RegisterForm.username}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Are You a Manager?</label>
                        <br/>
                            <input style={{marginRight:"8px"}} type="radio" onChange={onRadioChange} value={true} name="isManager" /> Yes
                            <br/>
                            <input style={{marginRight:"8px"}} type="radio" onChange={onRadioChange} value={false} name="isManager" /> No
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            onChange={handleFormChange}
                            name="email"
                            value={RegisterForm.email}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={handleFormChange}
                            name="password"
                            value={RegisterForm.password}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            onChange={handleFormChange}
                            name="confirmPassword"
                            value={RegisterForm.confirmPassword}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Enter your Company Name</label>
                        <input
                            onChange={handleFormChange}
                            name="name"
                            value={RegisterForm.name}
                            className="form-control" />
                    </div>
                    <button onClick={onFormSubmit} className="btn btn-primary">Submit</button>
                </form>
                </div>
            </CardContent>
        </Card>
        </Container>
    )
}

export default Registration