import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Container,Box , Button, Typography } from '@material-ui/core';
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
const AssignScope = () => {

    const [TeamId, setTeamId] = useState('');
    const [scopeId,setScopeId]=useState('')

    const [scopeName,setScopeName]=useState('')
    const [TeamName, setTeamName] = useState('');

    const [choice, setChoice]=useState([])

    const  [TeamChoice,setTeamChoice]=useState([])
    const [reset,setReset]=useState(null)

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





    useEffect(() => {
        axios.get("/api/project")
        .then(result => {
            setChoice(result.data)
            
        }
        )
        .catch(err => console.log(err))
      },[]);

      useEffect(() => {
        axios.get("/api/team")
        .then(result => {
            // setChoice(result.data)
            setTeamChoice(result.data)
        }
        )
        .catch(err => console.log(err))
      },[]);
   
function getTeam(){
    axios.get("/api/team")
        .then(result => {
            // setChoice(result.data)
            setTeamChoice(result.data)
        }
        )
        .catch(err => console.log(err))
   
}
    
 

    



    const onFormSubmit = (event) => {
        event.preventDefault()
        // console.log(AssignScope)
        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {
            
            //we will run an axios post request
            axios.post('/api/project/scope/toteam', {
                 teamId:TeamId,
                 scopeId:scopeId
            })
                .then(function (response) {
                    setSuccess('Scope was assigned to team')
                    handleSucces()
                })
                .catch(function (error) {
                    setErrors(error.response.data);
                    handleClick();
                });
            
            
           
        
    }



   async function handleSelect(e){
    
        await setScopeId(e.currentTarget.value);
    //    await setScopeName(e.currentTarget.name)

    }

    function handleTeamSelect(e){
       
        let test= TeamId
        if(test==e.target.value){
            setTeamName('')
        setTeamId('')
        }else{
            setTeamName(e.target.name)
            setTeamId(e.target.value)
        }
       
        // setScopeId(e.currentTarget.value)

    }




    return (
        <Container>
        <Box styles={styles} className="forms">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errors}
        </Alert>
      </Snackbar>
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                        <Box>
                        <Typography variant="h6"htmlFor="choice">1)Choose the Scope you want to assign:</Typography>
                <select onChange={handleSelect} >
                <option >{'Select your Scope'}</option>
                        {choice && choice.map((x,i) =>(
                            <optgroup label={x.title} key={i} >
                            {x.scope.map((y,i)=>(
                                <option key={i} label={y.title} className={y.scopeName}  value={y._id}>{y.scopeName}</option>
                            ))}
                            </optgroup>
                        ))}
                </select>
                        </Box>
                        
                        {scopeId && <Typography variant="h6" className="feedback">Scope selected</Typography>}
                        <Box>
                        <Box>
                        <Typography variant="h6" htmlFor="choice">2)Choose the Team:</Typography>
                        </Box>
                       
                <form onChange={handleTeamSelect} className="select">
                        {TeamChoice && TeamChoice.map((x,i) =>(
                            <Box>
                            <label key={x._id} forHtml="members">{x.name}</label>
                            <input key={i} type="checkbox" checked={reset} index={i} name={x.name} value={x._id}/>
                                {/* <option label={x.name} key={i} value={x._id}>{x.name}</option> */}
                            </Box>
                        ))}
                </form>
                <Box className='thisButton'>{TeamId && <Button variant="contained" color="secondary"  >Selected Team: {TeamName}</Button>}</Box>
                        </Box>
                        <button onClick={onFormSubmit} className="btn btn-primary">set assignment to team</button>
                    </form>
                </CardContent>
            </Card>
        </Box>
        </Container>
    )
}

export default AssignScope