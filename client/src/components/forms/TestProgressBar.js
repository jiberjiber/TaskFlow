import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ProjectForm from "./testProjectForm";
import TeamForm from "./TestTeamForm";
import ScopeForm from "./TestScopeForm";
import TaskForm from './TestTaskForm'
import AssignTeam from './TestAssigned'
// eslint-disable-next-line
import { Card, CardContent, Container, Box,Button, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['ProjectForm','Scope Form','Task Form',  'Create & assign Personel to Teams', 'Assign Scopes To Teams'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<ProjectForm/>);
    case 1:
      return (<ScopeForm/>);
    case 2:
      return (<TaskForm/>);
    case 3:
      return (<TeamForm/>);
    case 4:
      return (<AssignTeam/>);
    case 5:
      return 'Create and Assign Teams';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
//NEXT BUTTON
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container>
    <Box className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <Box display="flex" justifyContent="center">
              <Button
              
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
    </Container>
  );
}
