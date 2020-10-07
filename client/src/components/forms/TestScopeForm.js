import React, { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Card, CardContent, Container } from '@material-ui/core';
import styles from './styles.css'


//new project form component
const ScopeForm = () => {

    const [ScopeForm, setScopeForm] = useState({
        title: "",
        dueDate: ""

    })

    useEffect(() => {
        axios.get("/api/project")
        .then(result => setChoice(result.data))
        .catch(err => console.log(err))
      },[]);
   

    const [projectId,setProjectId]=useState('')
    const [choice, setChoice]=useState([])

    const [errors, setErrors] = useState({})
    const [formFeedback, setFormFeedback] = useState(false)

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setScopeForm({ ...ScopeForm, [name]: value });
        setFormFeedback(false)

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(ScopeForm)
        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {
            
            //we will run an axios post request
            axios.post('/api/project/scope', {
                 scopeName:ScopeForm.title,
                 dueDate:ScopeForm.dueDate,
                 projectId:projectId
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setScopeForm({ ...clearState })
            
            setFormFeedback(true)
        
    }



    function handleSelect(e){
        console.log(e.currentTarget.value)
        setProjectId(e.currentTarget.value)
      // console.log(lib,book)
    //     axios.put("/api/library/"+lib,{book:book})
    //   .then(res => toast.success(`${lBook} was saved to ${lName}`))
    //   .catch(err => toast.error(err.response.data))
        
    }

    async function handleDate(e){
        console.log(e.target.value)
        const value =await e.target.value;
        // await setScopeForm({ ...ScopeForm, dueDate: value });
        // setFormFeedback(false)
        convert(value)
    }
// if(ScopeForm.dueDate){
//     console.log(ScopeForm.dueDate)
// }
async function convert(x){
    let newDate= moment(x,'YYYY-MM-DD').format('MMMM Do YYYY')
    await setScopeForm({ ...ScopeForm, dueDate: newDate});
}

    return (
        <Container>
        <div styles={styles} className="forms">
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                        <div className="form-group">
                            <label>Title for your Project Scope</label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ScopeForm.title}
                                className="form-control" />
                        </div>
                
                        <div className="form-group date" data-provide="datepicker">
                            <label>Due Date for Scope</label>
                            
                        </div>
                        <label for="start">Start date:</label>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
                        <div>
                        <label htmlFor="choice">Choose a Project to add scope:</label>
                <select onChange={handleSelect} className="myDropDown">
                <option>{'Your Projects'}</option>
                        {choice && choice.map((x,i) =>(
                            <option key={i} value={x._id} >{x.title}</option>
                        ))}
                </select>
                <h5>`      Due`{ScopeForm.dueDate && ScopeForm.dueDate }</h5>
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">Add Scope</button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </Container>
    )
}

export default ScopeForm