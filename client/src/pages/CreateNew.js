//this page will render the layout for creating a
//new project, it will render the progress bar (stepper ui)
//the progress bar will render the 3 forms needed
//to create a new project

import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { mixed, number, object } from 'yup';

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function CreateNewProject() {
    return (
        <Card>
            <CardContent>
                <Formik
                    initialValues={{
                        //project start values
                        title: '',
                        description: '',
                        dueDate: '',
                        //task start values
                        scopeName: '',
                        dueDate: '',
                    }}
                    //waits for promise to resolve or reject
                    //then logs values
                    onSubmit={async (values) => {
                        await sleep(3000);
                        console.log('values', values);
                    }}>
                
                    <Form label="Create A New Project">
                        <Box paddingBottom={2}>
                            <Field fullWidth variant="outlined" name="title" component={TextField} label="Title of Project" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth variant="outlined" name="description" component={TextField} label="Description of Main Objective" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth variant="outlined" name="dueDate" component={TextField} label='What is the completion date for this project?' />
                        </Box>
                    </Form>
                </Formik>
            </CardContent>
        </Card>
                    
    )} 
    export function FormikStepper({ children, ...props}: FormikConfig<FormikValues>){
        return (
            <Formik {...props}>
                <Form autoComplete="off">{children}</Form>
            </Formik>
        )}