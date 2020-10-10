import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Box,
	Typography,
	Container,
	makeStyles,
	createMuiTheme,
	ThemeProvider,
	useMediaQuery,
} from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../components/Copyright";

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

<<<<<<< HEAD
function Alert(props) {
	return //<MuiAlert elevation={6} variant="filled" {...props} />;
}

=======
>>>>>>> 60ab1b9793bc44ed00e68b68abbbf7e11b7b4097
export default function ForgotPassword() {
	// eslint-disable-next-line
	const { token } = useParams();
	const classes = useStyles();
	const [form, setForm] = useState();
	// eslint-disable-next-line
	let sent = false;

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Form input:", form);
		if (form.password1 !== form.password2) {
			console.log("passwords dont match!");
		} else {
			console.log("passwords match!");
		}
	};

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

	return (
		<ThemeProvider theme={darkTheme}>
			<Container component="main" maxWidth="xs" theme={darkTheme}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Forgot Password
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Your E-Mail"
							type="email"
							name="email"
							onChange={handleFormChange}
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Submit email
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</ThemeProvider>
	);
}
