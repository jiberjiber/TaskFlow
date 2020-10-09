import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent,Container, Button } from '@material-ui/core';
import moment from 'moment'
import styles from './styles.css'


//new project form component
const ProjectForm = () => {
    ///editing
const [Edit,setEdit]=useState(false)
const [choice, setChoice]=useState([])
const [projectId,setProjectId]=useState('')

//normal form
const [ProjectForm, setProjectForm] = useState({
    title: "",
    description: "",
    dueDate: ""

})
const [errors, setErrors] = useState({})
const [formFeedback, setFormFeedback] = useState(false)



  function handleEdit(x){
    axios.get(`/api/project/${x}`, {

    }).then(function async (response) {
            console.log(response.data[0]);
           let data={
            title: response.data[0].title,
            description: response.data[0].description,
            dueDate: response.data[0].dueDate
        
           }
            

            setProjectForm({...data})
            
        })
        .catch(function (error) {
            console.log(error);
        });
  }

 function setediting(){
    let test=Edit

    if(test==true){
        setEdit(false)
        const clearState = {
            title: "",
            description: "",
            dueDate: ""
        }

        setProjectForm({ ...clearState })

    }else{
        setEdit(true)
        axios.get("/api/project")
        .then(result => setChoice(result.data))
        .catch(err => console.log(err))
    }
    
}

function handleSelect(e){
    console.log(e.currentTarget.value)
    // setProjectId(e.currentTarget.value)
    handleEdit(e.currentTarget.value)
    setProjectId(e.currentTarget.value)
}


const onFormUpdate = (event) => {
    event.preventDefault()
    console.log(ProjectForm)

        axios.put(`/api/project/${projectId}`, {
             title:ProjectForm.title,
             description:ProjectForm.description,
             dueDate:ProjectForm.dueDate,
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

        setProjectForm({ ...clearState })

        setFormFeedback(true)
    
}








    /////this for normal form
function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setProjectForm({ ...ProjectForm, [name]: value });
        setFormFeedback(false)

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(ProjectForm)

            axios.post('/api/project', {
                 title:ProjectForm.title,
                 description:ProjectForm.description,
                 dueDate:ProjectForm.dueDate,
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

            setProjectForm({ ...clearState })

            setFormFeedback(true)
        
    }

    async function handleDate(e){
        console.log(e.target.value)
        const value =await e.target.value;
   
        convert(value)
    }

    async function convert(x){
        let newDate= moment(x,'YYYY-MM-DD').format('MMMM Do YYYY')
        await setProjectForm({ ...ProjectForm, dueDate: newDate});
    }
    return (
        <Container>
        <div styles={styles} className="forms" >
        <Button variant="contained" color="primary" onClick={setediting}>Edit</Button>
            <Card styles={{marginLeft: 100}}>
                <CardContent>
                {Edit &&<div>
                
                <label htmlFor="choice">Choose a project to edit:</label>
                <select onChange={handleSelect} className="myDropDown">
                <option>{'Your Projects'}</option>
                        {choice && choice.map((x,i) =>(
                            <option key={i} value={x._id} >{x.title}</option>
                        ))}
                </select>
                </div>}
                    <form >
                        <div className="form-group">
                            <label><h5>Title of Project</h5></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ProjectForm.title}
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label><h5>Project Objective</h5></label>
                            <small className="form-text text-muted">Please give a brief description of the goal of your project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={ProjectForm.description}
                                className="form-control"
                                rows={3}/>
                        </div>
                        
                        <div className="form-group date" data-provide="datepicker">
                        <div className="form-group date" data-provide="datepicker">
                            <label>Overall Due Date for your Project</label>
                            
                        </div>
                        <label for="start">Completion date :</label>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
       <h5>{ProjectForm.dueDate &&<h4> Due Date:{ProjectForm.dueDate}</h4> }</h5>
                        </div>
                        <div>
                        {!Edit &&  <button onClick={onFormSubmit} className="btn btn-primary">Submit Project</button>} 
                        {Edit &&  <button onClick={onFormUpdate} className="btn btn-primary">Update Project</button>}
                        </div>
                        
                    </form>
                </CardContent>
            </Card>    
        </div>
        </Container>
    )
}

export default ProjectForm