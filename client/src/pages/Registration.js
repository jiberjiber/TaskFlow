//manager registration form
//register themselves as the manager of a company they create

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container } from '@material-ui/core'
import ProjectForm from '../components/forms/testProjectForm';

//for a new member that is creating a company to be manager of
const Registration = () => {
    const [RegisterForm, setRegisterForm] = useState({
        isManager: true,//employee data will start with the current person logged in
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        name: "",
        url: "",

    })
    // getCompanyInfo();
   
    function getCompanyInfo() {
        axios.get('/api/company')
          .then(function (response) {
            console.log(response)
            response.map(data){

            };
        // if( ProjectForm.name == )
        //   })
          .catch(function (error) {
            console.log(error);
          });
        }



    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setRegisterForm({ ...RegisterForm, [name]: value });

    }
   
    const onRadioChange = (e) => {
        console.log((e.target.value));
        RegisterForm.isManager=e.target.value

    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        //console.log(RegisterForm)
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
                url: RegisterForm.url
            })
                //pull data from this response
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        else if (RegisterForm.isManager === false) {
            //if just an employee then send employee values
            axios.post('/api/employee', {
                //employee data will start with the current person logged in
                firstName: RegisterForm.firstName,
                lastName: RegisterForm.lastName,
                username: RegisterForm.username,
                email: RegisterForm.email,
                password: RegisterForm.password,
                isManager: RegisterForm.isManager,
                name: RegisterForm.Name
            })
                //pull data from this response
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    // const clearState = {
    //     //employee data will start with the current person logged in
    //     firstName: "",
    //     lastName: "",
    //     username: "",
    //     isManager: "",
    //     email: "",
    //     password: "",
    //     company: ""
    // }

    // setRegisterForm({ ...clearState })



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
                        <label>Select your Role:</label>
                        <br/>
                            <input style={{marginRight:"8px"}} type="radio" onChange={onRadioChange} value={true} name="isManager" /> Manager
                            <br/>
                            <input style={{marginRight:"8px"}} type="radio" onChange={onRadioChange} value={false} name="isManager" /> Employee
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
                            onChange={handleFormChange}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            onChange={handleFormChange}
                            name="password"
                            value={RegisterForm.password}
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