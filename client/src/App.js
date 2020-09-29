import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// eslint-disable-next-line
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import projectsArray from "./projectsArray";

function App() {
	return (
		<BrowserRouter>
			<Dashboard />
			<Route
				exact
				path="/"
				render={(props) => <TeamOverview {...props} projects={projectsArray} />}
			/>
			<Route
				exact
				path="/admin"
				render={(props) => <Admin {...props} projects={projectsArray} />}
			/>
		</BrowserRouter>
	);
}

export default App;
