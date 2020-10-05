import React, {useState} from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import styles from './styles.css'



//new project form component
const ProjectForm = () =>{

const [ProjectForm, setProjectForm] = useState({
    title:"",
    description:"Test",
    dueDate:"Test"
    
})
const [errors,setErrors] = useState({})
//const [formFeedback,setFormFeedback] = useState({})

function handleFormChange (e){
    //console.log(e.target.value);
    const {name, value}=e.target;
    //setProjectForm([name]=e.target.value)
    //e.target.value = setProjectForm({...ProjectForm, [name]: value})
    setProjectForm({...ProjectForm,[name]:value});
    // ////setFormFeedback(false)
    console.log({name,value})
}



const onFormSubmit = (event)=>{
    event.preventDefault()

    // const errors=validate();
    // setErrors({...errors || {}})
    if (errors){
        return
    }
    else{
    // console.log(form)
    //we will run an axios 
    axios({
        method: 'post',
        url: '',
        data: {
         //form data props
        }
      });
      const clearState={
      title:"",
      description:"",
      dueDate:""}
    
   setProjectForm({...clearState})
    
    //setFormFeedback(true)
    }
    }
    
    return (
        <div styles={styles} className="forms">
            <Card>
                <CardContent>
                    <form>
                        <div className="form-group">
                            <label>Title of Project</label>
                            <input
                            onChange={handleFormChange}
                            name="title"
                            value={ProjectForm.title}
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Project Objective</label>
                            <small className="form-text text-muted">Please give a brief description of the goal of your project</small>
                            <textarea 
                            onChange={handleFormChange}
                            name="description"
                            value={ProjectForm.description} 
                            className="form-control" 
                            rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group date" data-provide="datepicker">
                            <label>Due Date for Project</label>
                            <input 
                            onChange={handleFormChange}
                            name="dueDate" 
                            value={ProjectForm.dueDate}
                            className="form-control" />
                            {/* <input class="datepicker" data-date-format="mm/dd/yyyy"></input>
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-th" />
                            </div> */}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectForm