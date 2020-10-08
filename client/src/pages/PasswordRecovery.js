import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Copyright from '../components/Copyright';
import Axios from "axios";


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

export default function PasswordRecovery() {
	const { token } = useParams();
	const classes = useStyles();
	const [form, setForm] = useState();

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setForm({...form, [name]:value});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Form input:', form);
		if(form.password1 !== form.password2){
			console.log('passwords dont match!');
		} else {
			console.log('passwords match!');
		}
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

	return (
		<ThemeProvider theme={darkTheme}>
		<Container component="main" maxWidth="xs" theme={darkTheme}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Password Recovery
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="password1"
						label="New Password"
						type="password"
						name="password1"
						onChange={handleFormChange}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password2"
						label="Confirm New Password"
						type="password"
						id="password2"
						onChange={handleFormChange}
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Save new password
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
