import React, { Component } from "react";
import { Formik } from "formik";
import  ProjectForm  from "./ProjectForm";
import TeamForm from"./TeamForm"
import TasksForm from './TasksForm'
import Paper from "@material-ui/core/Paper";
import styles from "./styles.css"

class FormWrapper extends Component {
 constructor(props) {
   super(props);
   this.state = {};
 }

 render() {
   const classes = this.props;
   
   return (
     <React.Fragment>
          <div style={styles.Project} className={classes.container}>
         <Paper elevation={1} className={classes.paper}>
           
           <Formik
             render={props => <ProjectForm {...props} />}
           />
         </Paper>
       </div>
     </React.Fragment>
   );
 }
}

export default FormWrapper