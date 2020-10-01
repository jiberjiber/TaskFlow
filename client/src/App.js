import React from 'react';
// eslint-disable-next-line
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Container } from '@material-ui/core';
//import Createform from './pages/CreateNew';
//import ProjectForm from './components/forms/ProjectForm';
import ProgressBar from './components/ProgressBar'
import ProjectForm from './components/forms/ProjectForm';
import FormWrapper from './components/forms/FormWrapper';


function App() {
  return (
	  <Container>
		  <FormWrapper>
		  	<ProjectForm/>
		  </FormWrapper>
		  
	  </Container>
  );
}

export default App;
