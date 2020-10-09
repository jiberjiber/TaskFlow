import React, { useState } from "react";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	useMediaQuery,
	createMuiTheme,
	ThemeProvider,
	makeStyles,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from '../components/Copyright';
import Axios from "axios";
import ErrorDialog from '../components/ErrorDialog';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const [alert, setAlert] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [form, setForm] = useState();

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		//console.log('Form input:', form);
		Axios.post(`/api/employee/login`, form)
			.then((response) => {
				localStorage.setItem('token', response.data);
				window.location = "/";
			})
			.catch((err) => {
				console.log('error', err);
				setErrorMsg(err.status);
				setAlert(true);
			});

	}

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

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlert(false);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container component="main" maxWidth="xs" theme={darkTheme}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
				</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange={handleFormChange}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleFormChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
					</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/forgotpassword" variant="body2">
									Forgot password?
							</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Contact us to set up an account"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
			<ErrorDialog open={alert} handleClose={handleClose}/>
		</ThemeProvider>
	);
}
