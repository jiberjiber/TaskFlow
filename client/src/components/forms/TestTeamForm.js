// eslint-disable-next-line
import { selectFields } from 'express-validator/src/select-fields';
import React, { useState,useEffect } from 'react';
import { Card, CardContent,Container, Button, Typography, Box } from '@material-ui/core';
import axios from 'axios'
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



const TeamForm = props => {
    const [TeamForm, setTeamForm] = useState({
        name: "",  
    })
    const [Members,setMembers]=useState([])
    const [choice, setChoice]=useState([])
    const [reset,setReset]=useState(null)
    const [Names,setNames]=useState([])
////editing states
const [Edit,setEdit]=useState(false)
const [choices, setChoices]=useState([])
const [teamId,setTeamId]=useState('')

///fedback
    const [errors, setErrors] = useState('')
    const [succes, setSuccess] = useState('')
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

  function handleEdit(x){
    axios.get(`/api/team/${x}`, {

    }).then(function async (response) {
            console.log(response.data);
           let data={
            name: response.data[0].name,
           
        
           }
            setTeamForm({...data})

            let nameArray=[]
            let idArray=[]
            response.data[0].members.map(x=>{
                nameArray.push(x.firstName);
                idArray.push(x._id)
				setReset(false)
				// eslint-disable-next-line
                return
            })

            setMembers(idArray);
            setNames(nameArray)
            // setMembers
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  function runAxios(){
    axios.get("/api/team")
    .then(result => {
        setChoices(result.data)
        console.log(result)
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
            name: "",
        }

        setTeamForm({ ...clearState })

    }else{
        setEdit(true)
        runAxios()
    }
    
}
function handleSelects(e){
  
    handleEdit(e.currentTarget.value)
    setTeamId(e.currentTarget.value)
}


const onFormUpdate = (event) => {
    event.preventDefault()
    // console.log(ProjectForm)

        axios.put(`/api/team/${teamId}`, {
            name:TeamForm.name,
            members:Members,
            
        })
            .then(function (response) {
                runAxios()
                console.log(response)
                setSuccess(`Success: this tem has now been updated`)
                handleSucces()
            })
            .catch(function (error) {
              
                setErrors(error.response.data);
                handleClick()
            });
        
        const clearState = {
            name: "",
           
        }

        setTeamForm({ ...clearState })

        // setFormFeedback(true)
    
}




  //////////
    useEffect(() => {
        axios.get("/api/employee")
        .then(result => {
            //console.log(result.data[0])
            setChoice(result.data[0].employees)
            
        }
        )
        .catch(err => console.log(err))
      },[]);
   
    const onFormSubmit = (event) => {
        event.preventDefault()
        // console.log(TeamForm)

            axios.post('/api/Team/add', {
                 name:TeamForm.name,
                 members:Members,
                 
            })
                .then(function (response) {
                    setReset(false)
                    setReset(null)
                    setMembers([]);
                    setNames([])
                    console.log(response);
                    setSuccess(`Success: team ${response.data.name} thas been created`)
                   handleSucces()
                })
                .catch(function (error) {
                    console.log(error.response);
                    setErrors('error');
                    handleClick();
                });
            
            const clearState = {
                name: "",
                isSelected:false
            }

            setTeamForm({ ...clearState })

            //setFormFeedback(true)
        
    }



    function handleFormChange (e){
        const {name, value}=e.target;
        setTeamForm({...TeamForm,[name]:value});
        //setFormFeedback(false)
        // console.log({name,value})
    }

    async function handleSelect(e){
        // let checkbox= e.target;
        // checkbox.checked= true
        // let newmember=e.target.name
        let myarray=[...Members]
        let nameArray=[...Names]
        let employee=e.target.value
       let names=e.target.name
        
        let test= await myarray.some(x=>{
            return x ===employee
        })
		// eslint-disable-next-line
        if (test ==false){
            setMembers([...Members,employee])
            setNames([...Names,names])
        }
		// eslint-disable-next-line
        if( test== true){
           let newTest= myarray.filter(x=>{
             return x!==employee
           })
           setMembers([...newTest])
		}
		// eslint-disable-next-line
        if( test== true){
            let newNames= nameArray.filter(x=>{
              return x!==names
            })
            setNames([...newNames])
         }

        // function removeElement(array, elem) {
        //     let index = array.indexOf(elem);
        //     if (index > -1) {
        //         array.splice(index, 1);
               
        //     }
        // }
    }
    return (
        <Container>
        <Box styles={styles} className="forms">
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
                {Edit &&<Box>
                
                <label htmlFor="choice">Choose a project to edit:</label>
                <select onChange={handleSelects} className="select">
                <option>{'Your Teams'}</option>
                        {choices && choices.map((x,i) =>(
                            <option key={i} value={x._id} >{x.name}</option>
                        ))}
                </select>
                </Box>}

            <form>
                <Box className="form-group">
                    <label><Typography variant="h6">1) Team Name</Typography></label>
                    <input
                        onChange={handleFormChange}
                        name="name"
                        value={TeamForm.name}
                        className="form-control" />
                </Box>
            <Card styles={{maxHeight: '100px'}}>
            <label><Typography variant="h6">2) Select personnel to add to your team(s)</Typography></label>
            <form action="/action_page.php" method="get" onChange={handleSelect}>
            {choice && choice.map((x,i) =>(
                <Box>
                <label key={i} forHtml="members">{x.firstName},{x.lastName}</label>
                <input key={x._id} type="checkbox" checked={reset} index={i} name={x.firstName} value={x._id}/>
                </Box>
                            
                        ))}
            </form>
            </Card>

               
            </form>
            <ol >
            {Names && Names.map((x,i)=>(
                <Box style={{display: "inline"}}>
                    <Button variant="contained" color="secondary" key={i} style={{display: "inline"}} >{x}</Button>
                    <span key={i}>  </span>
                    
                </Box>
            ))}
            </ol>
                <Box>
               {!Edit && <button onClick={onFormSubmit} className="btn btn-primary">Create Team!</button>}
                {Edit &&  <button onClick={onFormUpdate} className="btn btn-primary">Update Team</button>}
                </Box>

            </CardContent>
            </Card>
        </Box>
        </Container>
    )

};

export default TeamForm