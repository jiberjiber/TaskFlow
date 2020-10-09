import React, { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Card, CardContent, Container } from '@material-ui/core';
import styles from './styles.css'


//new project form component
const TaskForm = () => {

    const [TaskForm, setTaskForm] = useState({
        title: "",
        description:"",
        dueDate: ""

    })

    useEffect(() => {
        axios.get("/api/project")
        .then(result => {
            setChoice(result.data)
        
        }
        )
        .catch(err => console.log(err))
      },[]);
   

    const [scopeId,setScopeId]=useState('')
    const [choice, setChoice]=useState([])

    const [errors, setErrors] = useState({})
    const [formFeedback, setFormFeedback] = useState(false)

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setTaskForm({ ...TaskForm, [name]: value });
        // setFormFeedback(false)

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(TaskForm)
        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {
            
            //we will run an axios post request
            axios.post('/api/project/scope/task', {
                 task:TaskForm.title,
                 description:TaskForm.description,
                 dueDate:TaskForm.dueDate,
                 scopeId:scopeId
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

            setTaskForm({ ...clearState })
            
            setFormFeedback(true)
        
    }



    function handleSelect(e){
        console.log(e.currentTarget.value)
        setScopeId(e.currentTarget.value)
      // console.log(lib,book)
    //     axios.put("/api/library/"+lib,{book:book})
    //   .then(res => toast.success(`${lBook} was saved to ${lName}`))
    //   .catch(err => toast.error(err.response.data))
        
    }

    async function handleDate(e){
        console.log(e.target.value)
        const value =await e.target.value;
        // await setTaskForm({ ...TaskForm, dueDate: value });
        // setFormFeedback(false)
        convert(value)
    }
// if(TaskForm.dueDate){
//     console.log(TaskForm.dueDate)
// }
async function convert(x){
    let newDate= moment(x,'YYYY-MM-DD').format('MMMM Do YYYY')
    await setTaskForm({ ...TaskForm, dueDate: newDate});
}

    return (
        <Container>
        <div styles={styles} className="forms">
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                        <div className="form-group">
                            <label><h5>Title for Task</h5></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={TaskForm.title}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label><h5>Describe the Task in hand</h5></label>
                            <small className="form-text text-muted">Please give a brief description of the goal of this task in other to complete the project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={TaskForm.description}
                                className="form-control"
                                rows={3}/>
                        </div>
                
                        <div className="form-group date" data-provide="datepicker">
                            <label>Due Date for Task</label>
                            
                        </div>
                        <label for="start">Task Completion Date :</label>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
                        <div>
                        <label htmlFor="choice">Choose the Scope to which this task belongs:</label>
                <select onChange={handleSelect} className="myDropDown">
                <option>{'Select your Scope'}</option>
                        {choice && choice.map((x,i) =>(
                            <optgroup label={x.title} key={i} >
                            {x.scope.map((y,i)=>(
                                <option label={y.title} key={i} value={y._id}>{y.scopeName}</option>
                            ))}
                            </optgroup>
                        ))}
                </select>
                <h5>{TaskForm.dueDate && TaskForm.dueDate }</h5>
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">Add Tasks to scope</button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </Container>
    )
}

export default TaskForm