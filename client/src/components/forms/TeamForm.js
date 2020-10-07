import { selectFields } from 'express-validator/src/select-fields';
import React, { useState } from 'react';
import axios from 'axios'
import styles from './styles.css'

// const getMembers= ()=> {
//     axios.get
// }
//create Tasks form component
const TeamForm = props => {
    const [TeamForm, setTeamForm] = useState({
        name: "",
        owner: "",//req.param.id to get owner/manager name
        // members: [/*return firstName and LastName*/],
        // assignedScope: {/*tasksObject*/ },
        isSelected: false
    })

    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(TeamForm)
        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {
            
            //we will run an axios post request
            axios.post('/api/Team/add', {
                 name:TeamForm.name,
                 members:[TeamForm.members],
                 
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            const clearState = {
                name: "",
                isSelected:false
            }

            setTeamForm({ ...clearState })

            //setFormFeedback(true)
        
    }

    const selectMultiple = (array) => {
        const options = [].slice.call(document.querySelectorAll("option"));
        options.forEach(function (element) {
            // console.log("element", element);
            element.addEventListener("mousedown",
                function (e) {
                    e.preventDefault();
                    element.parentElement.focus();
                    this.isSelected = !this.isSelected;
                    return false;
                }
                , false
            );
        });
    }
    function handleFormChange (e){
        const {name, value}=e.target;
        setTeamForm({...TeamForm,[name]:value});
        //setFormFeedback(false)
        console.log({name,value})
    }

    return (
        <div styles={styles} className="forms">
            <form>
                <div className="form-group">
                    <label>Team Name</label>
                    <input
                        onChange={handleFormChange}
                        name="name"
                        value={TeamForm.name}
                        className="form-control" />
                </div>
                
                   
                <select className="custom-select multiple">
                    <label>Please select team members</label>
                    <option onClick={selectMultiple}>Open this select menu</option>
                    <option selected onClick={selectMultiple} value="1">One</option>
                    <option selected onClick={selectMultiple} value="2">Two</option>
                    <option selected onClick={selectMultiple} value="3">Three</option>
                    <option selected onClick={selectMultiple} value={TeamForm.members}></option>
                </select>
                <button onClick={onFormSubmit} className="btn btn-primary">Create Team!</button>
            </form>
        </div>
    )

};

export default TeamForm
