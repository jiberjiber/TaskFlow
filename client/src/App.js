import React from 'react';
// eslint-disable-next-line
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Container } from '@material-ui/core';

function App() {
  return (
	  <Container>
		  <Dashboard />
	  </Container>
  );
}

export default App;
