import React, { useState, useEffect, Component } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./frames/Dashboard";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import CreateNew from "./pages/CreateNew"
import ProjectInfo from "./pages/ProjectInfo";
import Error from "./pages/Error";
import EmployeeOverview from "./pages/EmployeeOverview";
import "./App.css";
import { Grid, ThemeProvider, useMediaQuery, createMuiTheme } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PasswordRecovery from "./pages/PasswordRecovery";
import ForgotPassword from "./pages/ForgotPassword";
import ScopeCard from './pages/ScopeCard';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const ProtectedRoute = (props) => {
	const { adminComponent: AdminComponent, userComponent: UserComponent, user, projects, userSet, ...rest } = props;
	
	return (
		<Route {...rest} render={() => {
				if (user._id && userSet) {
					console.log('user:', user);
					return (
						<div>
							<Dashboard user={user} />
							{user.isManager ? (
								<AdminComponent user={user} projects={projects} />
							):(
								<UserComponent user={user} projects={projects} />
							)}
						</div>
					);
				} else if(!user._id || !userSet) {
					return <Redirect to="/login" />
				}
			}
		} />
	)
}

function App(props) {
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);
	const [userSet, setUserSet] = useState(false);

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const darkTheme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	const classes = useStyles();

	const getToken = () => {
		return localStorage.getItem("token");
	};

	const decodeToken = () => {
		//try catch to prevent app from crashing if there is not token saved
		try {
			const jwt = localStorage.getItem("token");
			//console.log('token ', localStorage.getItem("token"));
			const decoded = jwtDecode(jwt);
			//console.log('decoded:',decoded)
			setUser(decoded);
			setUserSet(true);
			getProjects();
		} catch (error) {
			//if error reroute to login page
			//could use the same practice:
			//window.location = "/login";
			//console.log('entered error catch');
			// return (
			// 	<Redirect to="/login"  />
			// )
			// return null
		}
	};

	const getProjects = () => {
		Axios.get("/api/project")
			.then((response) => {
				//console.log(response.data);
				setProjects(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		// Get current user token from localstorage
		Axios.defaults.headers.common["x-auth-token"] = getToken();
		console.log('use effect ran');

		// Get user  (decode token)
		// if (window.location.pathname == "/login" || window.location.pathname == "/forgotpassword" || window.location.pathname.includes("/passwordrecovery/")) {
		// 	console.log('nothing')
		// } else {
		// 	decodeToken();
		// }
		decodeToken();
		// eslint-disable-next-line
	}, [userSet]);

	return (
		<BrowserRouter>
			<Route exact path="/login" render={(props) => <SignIn {...props} />} />
			<Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} />} />
			<Route exact path="/passwordrecovery" render={() => <Redirect to="/login" />} />
			<Route exact path="/passwordrecovery/:token" render={(props) => <PasswordRecovery {...props} />} />
			<ProtectedRoute exact path="/" user={user} projects={projects} adminComponent={TeamOverview} userComponent={EmployeeOverview} userSet={userSet} />
			<ProtectedRoute exact path="/admin" user={user} projects={projects} adminComponent={Admin} userComponent={Error} />
			<ProtectedRoute exact path="/admin/new" user={user} projects={projects} adminComponent={CreateNew} userComponent={Error} />
			<ProtectedRoute exact path="/create" user={user} projects={projects} adminComponent={CreateNew} userComponent={CreateNew} />
			<ProtectedRoute exact path="/project/:id" user={user} projects={projects} adminComponent={ProjectInfo} userComponent={ProjectInfo} />
			<ProtectedRoute exact path="/scope/:id" user={user} projects={projects} adminComponent={ScopeCard} userComponent={ScopeCard} />
		</BrowserRouter>
	);
}

export default App;
