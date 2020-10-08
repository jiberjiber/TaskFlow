//manager registration form
//register themselves as the manager of a company they create

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container } from '@material-ui/core'

//for a new member that is creating a company to be manager of
const Registration = () => {
    const [RegisterForm, setRegisterForm] = useState({
        isManager: "",//employee data will start with the current person logged in
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        name: "",
        url: "",

    })


    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setRegisterForm({ ...RegisterForm, [name]: value });

    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(RegisterForm)
        //check to see 
        if (setRegisterForm.isManager == true) {
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

        else if (setRegisterForm.isManager == false) {
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
        <Card styles={{ marginLeft: 100 }}>
            <CardContent>
                <form >
                    <div className="form-group">
                        <label>Enter your First Name:</label>
                        <input
                            onChange={handleFormChange}
                            name="firstName"
                            value={RegisterForm.firstName}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Enter your Last Name:</label>
                        <input
                            onChange={handleFormChange}
                            name="lastName"
                            value={RegisterForm.lastName}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Create a username:</label>
                        <small className="form-text text-muted">This </small>
                        <input
                            onChange={handleFormChange}
                            name="username"
                            value={RegisterForm.username}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <select>
                            <label>What are You?</label>
                            <option
                                onChange={handleFormChange}
                                name="isManager"
                                value={RegisterForm.isManager = true}>
                                a Manager</option>
                            <option
                                onChange={handleFormChange}
                                name="isManager"
                                value={RegisterForm.isManager = false}>
                                an Employee</option>
                        </select>
                    </div>
                    <button onClick={onFormSubmit} className="btn btn-primary">Submit</button>
                </form>

            </CardContent>
        </Card>

    )
}

export default Registration