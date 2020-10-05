import React from 'react';
// eslint-disable-next-line
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Container } from '@material-ui/core';
//import Createform from './pages/CreateNew';
//import ProjectForm from './components/forms/ProjectForm';
import ProgressBar from './components/forms/ProgressBar'
import ProjectForm from './components/forms/ProjectForm';
import FormWrapper from './components/forms/FormWrapper';
import TasksForm from './components/forms/TasksForm';
import TeamForm from './components/forms/TeamForm'

function App() {
  return (
	  <Container>
		  
		  <FormWrapper>
		  	<TeamForm/>
		  </FormWrapper>
		  
	  </Container>
  );
}

export default App;
