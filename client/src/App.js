import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// eslint-disable-next-line
import SignIn from "./pages/SignIn";
import Dashboard from "./frames/Dashboard";
import "./App.css";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import ProjectInfo from "./pages/ProjectInfo";
import projectsArray from "./projectsArray";

const signedIn = false;

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" render={(props) => <SignIn {...props} />} />
			<Route exact path="/home">
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
