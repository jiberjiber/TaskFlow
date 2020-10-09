import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Container, Button } from '@material-ui/core';
import styles from './styles.css'


//new project form component
const AssignScope = () => {

    const [TeamId, setTeamId] = useState('');
    const [scopeId,setScopeId]=useState('')

    const [scopeName,setScopeName]=useState('')
    const [TeamName, setTeamName] = useState('');

    const [choice, setChoice]=useState([])

    const  [TeamChoice,setTeamChoice]=useState([])
    const [reset,setReset]=useState(null)

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
    
    const [errors, setErrors] = useState({})
    const [formFeedback, setFormFeedback] = useState(false)

    



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
                    console.log('Scope was assigned to team')
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                 
                });
            
            
            setFormFeedback(true)
        
    }



   async function handleSelect(e){
      console.log(e.currentTarget.value)
        await setScopeId(e.currentTarget.value);
    //    await setScopeName(e.currentTarget.name)

    }

    function handleTeamSelect(e){
        console.log(e.target.value)
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
        <div styles={styles} className="forms">
            <Card styles={{marginLeft: 100}} >
                <CardContent>
                    <form >
                        <div>
                        <label htmlFor="choice">1)Choose the Scope you want to assign:</label>
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
                        </div>
                        
                        {scopeId && <p className="feedback">Scope selected</p>}
                        <div>
                        <div>
                        <label htmlFor="choice">2)Choose the Team:</label>
                        </div>
                       
                <form onChange={handleTeamSelect} className="select">
                        {TeamChoice && TeamChoice.map((x,i) =>(
                            <div>
                            <label key={x._id} forHtml="members">{x.name}</label>
                            <input key={i} type="checkbox" checked={reset} index={i} name={x.name} value={x._id}/>
                                {/* <option label={x.name} key={i} value={x._id}>{x.name}</option> */}
                            </div>
                        ))}
                </form>
                <div className='thisButton'>{TeamId && <Button variant="contained" color="secondary"  >Selected Team: {TeamName}</Button>}</div>
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">set assignment to team</button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </Container>
    )
}

export default AssignScope