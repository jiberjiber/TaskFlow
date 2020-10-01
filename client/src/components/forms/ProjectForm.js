import React from 'react';
import {Box, Card, CardContent, Typography} from '@material-ui/core';
import {Formik, Form, Field, ErrorMessage } from "formik";
import {TextField} from "formik-material-ui"
import styles from './styles.css'

//create new project form component
function ProjectForm (props) {
    
    return (
		<div styles={styles} className="forms">
        <Card>
        <CardContent>
        <Formik initialValues= {{
                title:"",
                //creator: get from sign in
                description:"",
                dueDate:"",
                //create major tasks
                scopeName:"",
                dueDateTask:"",
                //create team
                
                }}
                //onSubmit send to backend
                onSubmit={({ setSubmitting }) => {
                    // alert("Project is Created");
                    // setSubmitting(false);
                  }}>
                <Form className="Project"> 
                <Typography className={styles.header}variant="h5">Title of Project</Typography>
                <Field className="Field" variant="outlined" name="title"  component={TextField}/>
                <Field className="Field" variant="outlined" name="description"  component={TextField} label="Describe Your Project Objective"/>
                <Field className="Field" variant="outlined" name="dueDate"  component={TextField} label="Enter your deadline"/>
                
                </Form>
            </Formik>
        </CardContent>
        </Card>
        </div>
    )}

export default ProjectForm