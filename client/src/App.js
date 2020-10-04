import React, { useEffect } from "react";
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Route } from "react-router-dom";
// eslint-disable-next-line
import SignIn from "./pages/SignIn";
import Dashboard from "./frames/Dashboard";
import "./App.css";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import ProjectInfo from "./pages/ProjectInfo";
import projectsArray from "./projectsArray";


function App() {

	 const decodeToken = async ()=>{
		//try catch to prevent app from crashing if there is not token saved
	   try {
		const jwt= localStorage.getItem('token');
		const {firstName, lastName, email, isManager, company, _id}=jwtDecode(jwt);

		console.log('first', firstName, 'last', lastName, 'email', email, 'manager', isManager, 'company', company, 'id', _id);
	   } catch (error) {
		   //if error reroute to login page
		   //could use the same practice:
		   window.location='/login'
		  // return null
	
	   }
	
	}

	console.log(window.location.pathname);
	const getToken = () => {
		return localStorage.getItem('token');
	}

	useEffect(() => {
		// Get current user token from localstorage
		Axios.defaults.headers.common['x-auth-token']= getToken();

		// Get user  (decode token)
		if(window.location.pathname !== '/login'){
			decodeToken();
		}
	},[]);

	return (
		<BrowserRouter>
			<Route exact path="/login" render={(props) => <SignIn {...props} />} />
			<Route exact path="/">
				<Dashboard />
				<TeamOverview projects={projectsArray} />
			</Route>
			<Route exact path="/admin">
				<Dashboard />
				<Admin projects={projectsArray} />
			</Route>
			<Route exact path="/project/:id">
				<Dashboard />
				<ProjectInfo />
			</Route>
		</BrowserRouter>
	);
}

export default App;
