import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent,Container, Button, Box, Typography } from '@material-ui/core';
import moment from 'moment'
import styles from './styles.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';



///ui feedback
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));




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
const [errors, setErrors] = useState('')
const [succes, setSuccess] = useState('')

///////feedback states

const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [openS, setOpenS] = React.useState(false);
const handleClick = () => {
    setOpen(true);
  };
  const handleSucces = () => {
    setOpenS(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenS(false)
    setOpen(false);
  };

  /////////////




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
                setSuccess(`Success: "${response.data.title}" is now updated`)
                handleSucces()
            })
            .catch(function (error) {
                console.log(error);
                setErrors(error.response.data);
                handleClick()
            });
        
        const clearState = {
            title: "",
            description: "",
            dueDate: ""
        }

        setProjectForm({ ...clearState })

      
    
}








    /////this for normal form
function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setProjectForm({ ...ProjectForm, [name]: value });
        

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
                    console.log(response.data);
                    setSuccess(`Success: you now have ${response.data.length} projects`)
                    handleSucces()
                })
                .catch(function (error) {
                    setErrors(error.response.data);
                    handleClick()
                });
            
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setProjectForm({ ...clearState })

            
        
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
        <Box styles={styles} className="forms" >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errors}
        </Alert>
      </Snackbar>
      <Snackbar open={openS} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {succes}
        </Alert>
      </Snackbar>
        <Box display="flex" justifyContent="flex-end">
        <Button align="right" variant="contained" color="primary" onClick={setediting}>{Edit && `cancel `}Edit</Button>
        </Box>
        
            <Card styles={{marginLeft: 100}}>
                <CardContent>
                {Edit &&<Box>
                
                <label htmlFor="choice">Choose a project to edit:</label>
                <select onChange={handleSelect} className="myDropDown">
                <option>{'Your Projects'}</option>
                        {choice && choice.map((x,i) =>(
                            <option key={i} value={x._id} >{x.title}</option>
                        ))}
                </select>
                </Box>}
                    <form >
                        <Box className="form-group">
                            <label><Typography variant="h6">1) Title of Project</Typography></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ProjectForm.title}
                                className="form-control"/>
                        </Box>
                        <Box className="form-group">
                            <label><Typography variant="h6">2) Project Objective</Typography></label>
                            <small className="form-text text-muted">Please give a brief description of the goal of your project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={ProjectForm.description}
                                className="form-control"
                                rows={3}/>
                        </Box>
                        
                        <Box className="form-group date" data-provide="datepicker">
                        <Box className="form-group date" data-provide="datepicker">
                            <Typography variant="h6">3) Project Due Date</Typography>
                            
                        </Box>
                        <label for="start">Completion date :</label>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
       <Typography variant="h6">{ProjectForm.dueDate &&<Typography variant="h6"> Due Date:{ProjectForm.dueDate}</Typography> }</Typography>
                        </Box>
                        <Box>
                        {!Edit &&  <button onClick={onFormSubmit} className="btn btn-primary">Submit Project</button>} 
                        {Edit &&  <button onClick={onFormUpdate} className="btn btn-primary">Update Project</button>}
                        </Box>
                        
                    </form>
                </CardContent>
            </Card>    
        </Box>
        </Container>
    )
}

export default ProjectForm