import React, { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Card, CardContent, Container, Button, Box, Typography } from '@material-ui/core';
import styles from './styles.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


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
const TaskForm = () => {

    const [TaskForm, setTaskForm] = useState({
        title: "",
        description:"",
        dueDate: ""

    })
    const [scopeId,setScopeId]=useState('')
    const [choice, setChoice]=useState([])



    const [errors, setErrors] = useState('')
    const [succes, setSuccess] = useState('')

///////////////////////
///editing task states and functionality
const [Edit,setEdit]=useState(false)
const [choices, setChoices]=useState([])
const [TaskIds,setTaskIds]=useState('')
const [array, setArray]=useState([])

///////feedback states
// eslint-disable-next-line
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

function getTask(x){
    axios.get(`/api/project/scope/task/one/${x}`)
    .then(result => {
        console.log(result.data)
    let data={
    title:result.data[0].task,
    description:result.data[0].description,
    dueDate:result.data[0].dueDate
    }
    // console.log(data)
    setTaskForm({...data})

    })
    .catch(err => console.log(err))
}

function runAxios(){
    axios.get("/api/project")
    .then((result) => {
        // console.log(result.data)
        setChoices(result.data)
        
    })
    .catch(err => console.log(err))
}

useEffect(() => {
	loop()
	// eslint-disable-next-line
  },[choices]);

// eslint-disable-next-line
function handleEdit(){
    axios.get("/api/project")
    .then(result => {
        setChoices(result.data)
        
    }
    )
    .catch(err => console.log(err))
  }

  function setediting(){
    let test=Edit
	// eslint-disable-next-line
    if(test==true){
        setEdit(false)
        const clearState = {
            title: "",
            description:"",
            dueDate: ""
        }

        setTaskForm({ ...clearState })

    }else{
        setEdit(true)
        runAxios()
    }
    
}

function handleSelectEdit(e){
    
    getTask(e.currentTarget.value)
    setTaskIds(e.currentTarget.value)
}

const onFormUpdate = (event) => {
    event.preventDefault()
    // console.log(ProjectForm)

        axios.put(`/api/project/scope/task/one/${TaskIds}`, {
            task:TaskForm.title,
            description:TaskForm.description,
            dueDate:TaskForm.dueDate
        })
            .then(function (response) {
                runAxios()
                
                setSuccess(`Success: "${response.data[0].task}" is now updated`)
                handleSucces()
            })
            .catch(function (error) {
                // console.log(error.response)
                setErrors(error.response.data);
                handleClick()
            });
        
        const clearState = {
            title: "",
            description: "",
            dueDate: ""
        }

        setTaskForm({ ...clearState })

        // setFormFeedback(true)
    
}

function loop(){
	let myArray= [...array]
	// eslint-disable-next-line
    choices.map((x)=>{
		// eslint-disable-next-line
        if(x.scope.length>0){
			// eslint-disable-next-line
            x.scope.map(y =>{
               myArray.push(y)
            })
        }
        
    })
    setArray(myArray)
}




//////////////////////////////////////////////////
////create task functionality
    useEffect(() => {
        axios.get("/api/project")
        .then(result => {
            setChoice(result.data)
        
        }
        )
        .catch(err => console.log(err))
      },[]);
   

   

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setTaskForm({ ...TaskForm, [name]: value });
        

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
       
    
            axios.post('/api/project/scope/task', {
                 task:TaskForm.title,
                 description:TaskForm.description,
                 dueDate:TaskForm.dueDate,
                 scopeId:scopeId
            })
                .then(function (response) {
                    
                   
                   setSuccess(`Success: this scope has now ${response.data.task.length} task(s)`)
                   handleSucces()
                })
                .catch(function (error) {
                    console.log(error.response.data)
                    setErrors(error.response.data);
                    handleClick();
                });
            
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setTaskForm({ ...clearState })
            
          
        
    }



    function handleSelect(e){
        
        setScopeId(e.currentTarget.value)
    
        
    }

    async function handleDate(e){
       
        const value =await e.target.value;
 
        convert(value)
    }

async function convert(x){
    let newDate= moment(x,'YYYY-MM-DD').format('MMMM Do YYYY')
    await setTaskForm({ ...TaskForm, dueDate: newDate});
}

//////////


    return (
        <Container>
        <div styles={styles} className="forms">
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
        <Button variant="contained" color="primary" onClick={setediting}>{Edit && `cancel `}Edit</Button>
        </Box>  
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                   {Edit && <div>
                    <label htmlFor="choice">Choose the task you want to edit:</label>
                <select onChange={handleSelectEdit} className="myDropDown">
                <option>{'Select your Scope'}</option>
                        {array && array.map((x,i) =>(
                            <optgroup label={x.scopeName} key={i} >
                            {x.task.map((y,i)=>(
                                <option label={y.task} key={i} value={y._id}>{y.task}</option>
                            ))}
                            </optgroup>
                        ))}
                </select>
                        </div>}

                        <div className="form-group">
                            <label><Typography variant="h6">1) Title for Task</Typography></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={TaskForm.title}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label><Typography variant="h6">2) Describe the Task in hand</Typography></label>
                            <small className="form-text text-muted">Please give a brief description of the goal of this task in other to complete the project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={TaskForm.description}
                                className="form-control"
                                rows={3}/>
                        </div>
                
                        <div className="form-group date" data-provide="datepicker">
                            
                        </div>
                        <Typography variant="h6">3) Task Completion Date :</Typography>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
                         {!Edit && <div>
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
                </div>}
                <Typography variant="h6">{TaskForm.dueDate && TaskForm.dueDate }</Typography>
                {!Edit &&  <button onClick={onFormSubmit} className="btn btn-primary">Add Tasks to scope</button>}
                        {Edit &&  <button onClick={onFormUpdate} className="btn btn-primary">Update Scope</button>}
                    </form>
                </CardContent>
            </Card>
        </div>
        </Container>
    )
}

export default TaskForm