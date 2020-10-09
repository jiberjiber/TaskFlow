import { selectFields } from 'express-validator/src/select-fields';
import React, { useState,useEffect } from 'react';
import { Card, CardContent,Container } from '@material-ui/core';
import axios from 'axios'
import styles from './styles.css'

// const getMembers= ()=> {
//     axios.get
// }
//create Tasks form component
const TeamForm = props => {
    const [TeamForm, setTeamForm] = useState({
        name: "",  
        assignedProjects:'',
        isSelected: false
    })
    const [Members,setMembers]=useState([])
    const [choice, setChoice]=useState([])
    const [reset,setReset]=useState(null)
    const [Names,setNames]=useState([])
    useEffect(() => {
        axios.get("/api/employee")
        .then(result => {
            console.log(result.data[0])
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
                })
                .catch(function (error) {
                    console.log(error);
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
    
        if (test ==false){
            setMembers([...Members,employee])
            setNames([...Names,names])
        }

        if( test== true){
           let newTest= myarray.filter(x=>{
             return x!==employee
           })
           setMembers([...newTest])
        }
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
        <div styles={styles} className="forms">
        <Card styles={{marginLeft: 100}} >
                <CardContent>
            <form>
                <div className="form-group">
                    <label><h5>Team Name</h5></label>
                    <input
                        onChange={handleFormChange}
                        name="name"
                        value={TeamForm.name}
                        className="form-control" />
                </div>
            <Card styles={{maxHeight: '100px'}}>
            <label><h5>Select personnel to add to your team(s)</h5></label>
            <form action="/action_page.php" method="get" onChange={handleSelect}>
            {choice && choice.map((x,i) =>(
                <div>
                <label key={x._id} forHtml="members">{x.firstName},{x.lastName}</label>
                <input key={i} type="checkbox" checked={reset} index={i} name={x.firstName} value={x._id}/>
                </div>
                            
                        ))}
            </form>
            </Card>

                <button onClick={onFormSubmit} className="btn btn-primary">Create Team!</button>
            </form>
            <ol >
            {Names && Names.map((x)=>(
                <div style={{display: "inline"}}>
                    <li style={{display: "inline"}}>{x}</li>
                    <span>  ,</span>
                </div>
            ))}
            </ol>
            </CardContent>
            </Card>
        </div>
        </Container>
    )

};

export default TeamForm