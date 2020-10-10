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
const ScopeForm = () => {
//this is the create area
    const [ScopeForm, setScopeForm] = useState({
        title: "",
        dueDate: ""

    })

//this is the editing states

const [Edit,setEdit]=useState(false)
const [choices, setChoices]=useState([])
const [ScopeIds,setScopeIds]=useState('')

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


function getScope(x){
    axios.get(`/api/project/scope/one/${x}`)
    .then(result => {
       
    let data={
    title: result.data[0].scopeName,
    dueDate: result.data[0].dueDate
    }
    setScopeForm({...data})

    })
    .catch(err => console.log(err))
}


function runAxios(){
    axios.get("/api/project")
    .then(result => setChoices(result.data))
    .catch(err => console.log(err))
}

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

    if(test==true){
        setEdit(false)
        const clearState = {
            title: "",
            dueDate: ""
        }

        setScopeForm({ ...clearState })

    }else{
        setEdit(true)
        runAxios()
    }
    
}

function handleSelectEdit(e){
    
    getScope(e.currentTarget.value)
    setScopeIds(e.currentTarget.value)
}

const onFormUpdate = (event) => {
    event.preventDefault()
    // console.log(ProjectForm)

        axios.put(`/api/project/scope/one/${ScopeIds}`, {
            scopeName:ScopeForm.title,
            dueDate:ScopeForm.dueDate
        })
            .then(function (response) {
                runAxios()
                
                setSuccess(`Success: "${response.data[0].scopeName}" is now updated`)
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

        setScopeForm({ ...clearState })

        // setFormFeedback(true)
    
}



//////////////////////////////////////////////////
    //this is the create area
    useEffect(() => {
        axios.get("/api/project")
        .then(result => setChoice(result.data))
        .catch(err => console.log(err))
      },[]);
   

    const [projectId,setProjectId]=useState('')
    const [choice, setChoice]=useState([])

    const [errors, setErrors] = useState('')
    const [succes, setSuccess] = useState('')

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setScopeForm({ ...ScopeForm, [name]: value });
      

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        
        
            axios.post('/api/project/scope', {
                 scopeName:ScopeForm.title,
                 dueDate:ScopeForm.dueDate,
                 projectId:projectId
            })
                .then(function (response) {
                   
                    setSuccess(`Success: Project:"${response.data.title}" has now ${response.data.scope.length} scope(s)`)
                   handleSucces()
                })
                .catch(function (error) {
                    setErrors(error.response.data);
                    handleClick();
                });
            
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setScopeForm({ ...clearState })
            
        
    }



    function handleSelect(e){
       
        setProjectId(e.currentTarget.value)
      // console.log(lib,book)
    //     axios.put("/api/library/"+lib,{book:book})
    //   .then(res => toast.success(`${lBook} was saved to ${lName}`))
    //   .catch(err => toast.error(err.response.data))
        
    }

    async function handleDate(e){
        
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
        <Box styles={styles} className="forms">
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errors}
        </Alert>
      </Snackbar>
      <Snackbar open={openS} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {succes}
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="flex-end">
        <Button align="right" variant="contained" color="primary" onClick={setediting}>{Edit && `cancel `}Edit</Button>
        </Box> 
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                    {Edit &&<Box>
                
                <label htmlFor="choice">Choose a project to edit:</label>
                <select onChange={handleSelectEdit} className="myDropDown">
                <option>{'Your Projects'}</option>
                        {choices && choices.map((x,i) =>(
                            <optgroup label={x.title} key={i} >
                            {x.scope.map((y,i)=>(
                                <option label={y.title} key={i} value={y._id}>{y.scopeName}</option>
                            ))}
                            </optgroup>
                        ))}
                </select>
                </Box>}
                        <Box className="form-group">
                            <label><Typography variant="h6">1) Title for your Scope(s)</Typography></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ScopeForm.title}
                                className="form-control" />
                        </Box>
                
                        <Box className="form-group date" data-provide="datepicker">
                            {/* <label>Due Date for Scope(s)</label> */}
                            
                        </Box>
                        <Typography variant="h6">2) Scope Completion date :</Typography>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
                        {!Edit && <Box>
                        <Typography variant="h6">3) Choose the project which this scope belongs:</Typography>
                <select onChange={handleSelect} className="myDropDown">
                <option>{'Your Projects'}</option>
                        {choice && choice.map((x,i) =>(
                            <option key={i} value={x._id} >{x.title}</option>
                        ))}
                </select>
               
                
                        </Box>}
                        <Typography variant="h6">{ScopeForm.dueDate &&<Typography variant="h6">Due Date:{ScopeForm.dueDate}</Typography>}</Typography>
                        {!Edit && <button onClick={onFormSubmit} className="btn btn-primary">Add Scope</button>}
                        {Edit &&  <button onClick={onFormUpdate} className="btn btn-primary">Update Scope</button>}
                    </form>
                </CardContent>
            </Card>
        </Box>
        </Container>
    )
}

export default ScopeForm