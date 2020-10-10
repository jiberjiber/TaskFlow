
import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Dashboard from "./frames/Dashboard";
import SignIn from "./pages/SignIn";
import TeamOverview from "./pages/TeamOverview";
import Admin from "./pages/Admin";
import CreateNew from "./pages/CreateNew";
import ProjectInfo from "./pages/ProjectInfo";
import Error from "./pages/Error";
import EmployeeOverview from "./pages/EmployeeOverview";
import PasswordRecovery from "./pages/PasswordRecovery";
import ForgotPassword from "./pages/ForgotPassword";
import ScopePage from "./pages/ScopePage";
import TeamAdmin from "./pages/TeamAdmin";
import {
	Grid,
	ThemeProvider,
	useMediaQuery,
	createMuiTheme,
	CircularProgress,
	makeStyles,
	useTheme,
} from "@material-ui/core";
import "./App.css";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

function App() {
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);

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

	const theme = useTheme();

	const classes = useStyles();

	const getToken = () => {
		return localStorage.getItem("token");
	};

	const decodeToken = () => {
		//try catch to prevent app from crashing if there is not token saved
		try {
			const jwt = localStorage.getItem("token");
			const decoded = jwtDecode(jwt);
			setUser(decoded);
			if (decoded.isManager) {
				getProjects();
			}
		} catch (error) {
			//if error reroute to login page
			//could use the same practice:
			window.location = "/login";
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
	};

	useEffect(() => {
		// Get current user token from localstorage
		Axios.defaults.headers.common["x-auth-token"] = getToken();

		// Get user  (decode token)
		if (window.location.pathname == "/login" || window.location.pathname == "/forgotpassword" || window.location.pathname == "/passwordrecovery/") {
			console.log('nothing')
		} else {
			decodeToken();
		}
		// eslint-disable-next-line
	}, []);

	if (user && projects) {
		return (
			<BrowserRouter>
				<ThemeProvider theme={darkTheme}>
					<Route
						exact
						path="/login"
						render={(props) => <SignIn {...props} />}
					/>
					<Route
						exact
						path="/forgotpassword"
						render={(props) => <ForgotPassword {...props} />}
					/>
					<Route
						exact
						path="/passwordrecovery/:token"
						render={(props) => <PasswordRecovery {...props} />}
					/>
					<Route exact path="/">
						{user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<TeamOverview projects={projects} />
							</div>
						)}
						{!user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<EmployeeOverview projects={projects} user={user} />
							</div>
						)}
					</Route>
					<Route exact path="/admin">
						{user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<Admin user={user} projects={projects} />
							</div>
						)}
						{!user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<Error />
							</div>
						)}
					</Route>
					<Route exact path="/admin/teams">
						{user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<TeamAdmin user={user} projects={projects} />
							</div>
						)}
						{!user.isManager && (
							<div>
								<Dashboard user={user} theme={theme} />
								<Error />
							</div>
						)}
					</Route>
					<Route exact path="/create">
						<Dashboard user={user} theme={theme} />
						<CreateNew />
					</Route>
					<Route exact path="/project/:id">
						<Dashboard user={user} theme={theme} />
						<ProjectInfo projects={projects} />
					</Route>
					<Route exact path="/scope/:id">
						<Dashboard user={user} theme={theme} />
						<ScopePage projects={projects} />
					</Route>
				</ThemeProvider>
			</BrowserRouter>
		);
	} else {
		return (
			<ThemeProvider theme={darkTheme}>
				<div className={classes.root}>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{ minHeight: "100vh" }}
					>
						<CircularProgress />
					</Grid>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;