//manager is logged in: clicks to add employees
//addEmployee is added and sent to the matching company id 
//so get company id from a get user req
//post employeee addEmployee to that company id
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"

const addEmployee = () => {
    const [addEmployee, setaddEmployee] = useState({
        isManager: false,//manager is already created so only false value
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
        name: "",//make equal to manager.company name


    })

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setaddEmployee({ ...addEmployee, [name]: value });

    }
    function checkPassword() {
        let val1=addEmployee.password
         let val2=addEmployee.confirmPassword
          if (val1 === val2){
              setaddEmployee(addEmployee.password = value );
          }
          else {
              return (alert("Passwords Do Not Match, Please Re-enter To Submit"))
          }
          }
          const onFormSubmit = (event) => {
            event.preventDefault()
            //console.log(addEmployee)
            checkPassword();
            axios.post("/api/register", {
                isManager: addEmployee.isManager,
                firstName: addEmployee.firstName,
                lastName: addEmployee.lastName,
                username: addEmployee.username,
                email: addEmployee.email,
                password: addEmployee.password,
                company: addEmployee.company,
            })

    // const { id } = useParams();
    // console.log({id})
    return (
        <Container>
            <Card styles={{ marginLeft: 100 }}>
                <CardContent>
                    <form >
                        <h1>Please Fill in All Employee Details</h1>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                onChange={handleFormChange}
                                name="firstName"
                                value={addEmployee.firstName}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                onChange={handleFormChange}
                                name="lastName"
                                value={addEmployee.lastName}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                        <label>Username</label>
                        <small>Usernames can be configured in settings to create more privacy</small>
                        <input
                            onChange={handleFormChange}
                            name="username"
                            value={addEmployee.username}
                            className="form-control" />
                    </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                onChange={handleFormChange}
                                name="email"
                                value={addEmployee.email}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={handleFormChange}
                                name="password"
                                value={addEmployee.password}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                onChange={handleFormChange}
                                name="confirmPassword"
                                value={addEmployee.confirmPassword}
                                className="form-control" />
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">Submit</button>
                    </form>

                </CardContent>
            </Card>
        </Container>

    )
}

export default addEmployee
