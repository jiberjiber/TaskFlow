//this page will render the layout for creating a
//new project, it will render the progress bar (stepper ui)
//the progress bar will render the 3 forms needed
//to create a new project

import {Card, CardContent, } from '@material-ui/core';
import React from 'react';
import TestProgressBar from '../components/forms/TestProgressBar'

export default function CreateNewProject() {
    return (
        <Card>
            <CardContent>
             
              <TestProgressBar/>
                
            </CardContent>
        </Card>
                    
    )} 
    