import React, { useState } from 'react';
import styles from './styles.css'

//create Tasks form component
const TeamForm = props => {
    const [TeamForm, setTeamForm] = useState({
        name: "",
        owner: "",//req.param.id to get owner/manager name
        members: [/*return firstName and LastName*/],
        assignedScope: {/*tasksObject*/ }
    })

    const selectMultiple = (array) => {
        const options = [].slice.call(document.querySelectorAll("option"));
        options.forEach(function (element) {
            // console.log("element", element);
            element.addEventListener("mousedown",
                function (e) {
                    e.preventDefault();
                    element.parentElement.focus();
                    this.selected = !this.selected;
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
                
                   
                    <select class="custom-select"multiple>
                    <label>Please select team members</label>
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value={TeamForm.members}>{selectMultiple}</option>
                </select>
                <button className="btn btn-primary">Create Team!</button>
            </form>
        </div>
    )

};

export default TeamForm
