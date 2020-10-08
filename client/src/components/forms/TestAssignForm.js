import { selectFields } from 'express-validator/src/select-fields';
import React, { useState,useEffect } from 'react';
import { Card, CardContent,Container } from '@material-ui/core';
import axios from 'axios'
import styles from './styles.css'

// const getMembers= ()=> {
//     axios.get
// }
//create Tasks form component
const AssignForm = props => {
    const [AssignForm, setAssignForm] = useState({
        name: "",  
        assignedProjects:'',
        isSelected: false
    })
    const [Members,setMembers]=useState([])
    const [choice, setChoice]=useState([])
    const [reset,setReset]=useState(null)

    useEffect(() => {
        axios.get("/api/team")
        .then(result => {
            console.log(result.data[0].employees)
            setChoice(result.data[0].employees)
            
        }
        )
        .catch(err => console.log(err))
      },[]);

     
   
    const onFormSubmit = (event) => {
        event.preventDefault()
        // console.log(AssignForm)

            axios.post('/api/Team/add', {
                 name:AssignForm.name,
                 members:Members,
                 
            })
                .then(function (response) {
                    setReset(false)
                    setReset(null)
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            const clearState = {
                name: "",
                isSelected:false
            }

            setAssignForm({ ...clearState })

            //setFormFeedback(true)
        
    }



    function handleFormChange (e){
        const {name, value}=e.target;
        setAssignForm({...AssignForm,[name]:value});
        //setFormFeedback(false)
        // console.log({name,value})
    }

    async function handleSelect(e){
        // let checkbox= e.target;
        // checkbox.checked= true
        // let newmember=e.target.name
        let myarray=[...Members]
        let employee=e.target.value
       
        
        let test= await myarray.some(x=>{
            return x ===employee
        })
    
        if (test ==false){
            setMembers([...Members,employee])
        }

        if( test== true){
           let newTest= myarray.filter(x=>{
             return x!==employee
           })
           setMembers([...newTest])
        }

        function removeElement(array, elem) {
            let index = array.indexOf(elem);
            if (index > -1) {
                array.splice(index, 1);
               
            }
        }
    }
    return (
        <Container>
        <div styles={styles} className="forms">
        <Card styles={{marginLeft: 100}} >
                <CardContent>
            <form>
                <div className="form-group">
                    <label>Team Name</label>
                    <input
                        onChange={handleFormChange}
                        name="name"
                        value={AssignForm.name}
                        className="form-control" />
                </div>
            <Card styles={{maxHeight: '100px'}}>
            <form action="/action_page.php" method="get" onChange={handleSelect}>
            {choice && choice.map((x,i) =>(
                <div>
                <label key={x._id} forHtml="members">{x.firstName},{x.lastName}</label>
                <input key={i} type="checkbox" checked={reset} index={i} name={x.firstName} value={x._id}/>
                </div>
                            
                        ))}
            </form>
            </Card>

                {/* <select className="custom-select multiple">
                    <label>Please select team members</label>
                    <option onClick={selectMultiple}>Open this select menu</option>
                    <option selected onClick={selectMultiple} value="1">One</option>
                    <option selected onClick={selectMultiple} value="2">Two</option>
                    <option selected onClick={selectMultiple} value="3">Three</option>
                    <option selected onClick={selectMultiple} value={AssignForm.members}></option>
                </select> */}
                <button onClick={onFormSubmit} className="btn btn-primary">Create Team!</button>
            </form>
            {Members && <h5>here{Members}</h5>}
            </CardContent>
            </Card>
        </div>
        </Container>
    )

};

export default AssignForm