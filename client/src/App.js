import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./frames/Dashboard";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import ProjectInfo from "./pages/ProjectInfo";
import projectsArray from "./projectsArray";
import Error from './pages/Error';
import EmployeeOverview from './pages/EmployeeOverview';
import "./App.css";

function App() {
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);

	const decodeToken = async () => {
		//try catch to prevent app from crashing if there is not token saved
		try {
			const jwt = localStorage.getItem("token");
			setUser(jwtDecode(jwt));
			getProjects();
		} catch (error) {
			//if error reroute to login page
			//could use the same practice:
			window.location = "/login";
			// return null
		}
	};

	const getToken = () => {
		return localStorage.getItem("token");
	};

	useEffect(() => {
		// Get current user token from localstorage
		Axios.defaults.headers.common["x-auth-token"] = getToken();

		// Get user  (decode token)
		if (window.location.pathname !== "/login") {
			decodeToken();
		}
	// eslint-disable-next-line
	}, []);

	function getProjects() {
			Axios.get("/api/project")
			.then((response) => {
				setProjects(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<BrowserRouter>
			<Route exact path="/login" render={(props) => <SignIn {...props} />} />
			<Route exact path="/">
				{user.isManager && (
					<div>
						<Dashboard user={user} />
						<TeamOverview projects={projects} />
					</div>
				)}
				{!user.isManager && (
					<div>
						<Dashboard user={user} />
						<EmployeeOverview projects={projects} user={user} />
					</div>
				)}
			</Route>
			<Route exact path="/admin">
				{user.isManager && (
					<div>
						<Dashboard user={user} />
						<Admin projects={projectsArray} />
					</div>
				)}
				{!user.isManager && (
					<div>
						<Dashboard user={user} />
						<Error />
					</div>
				)}
			</Route>
			<Route exact path="/project/:id">
				<Dashboard user={user} />
				<ProjectInfo />
			</Route>
		</BrowserRouter>
	);
}

export default App;
