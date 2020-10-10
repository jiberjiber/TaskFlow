// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
	makeStyles,
	Grid,
	IconButton,
	Tooltip,
	Container,
	Typography,
	CircularProgress,
	Divider,
	Fab,
	List,
	ListItemText,
	ListItem,
	ListSubheader,
	ListItemSecondaryAction,
	Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Add, Delete, BuildSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	empList: {
		backgroundColor: "#444444",
		width: "100%",
		minWidth: "300px",
	},
	fab: {
		margin: theme.spacing(2),
	},
	m25: {
		margin: "25px",
	},
	m50: {
		margin: "50px",
	},
	mt25: {
		marginTop: "25px",
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TeamAdmin(props) {
	const [company, setCompany] = useState({});
	const [teams, setTeams] = useState([]);
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState("");
	const [severity, setSeverity] = useState("info");
	const classes = useStyles();

	console.log(props);

	const getCompany = (company) => {
		Axios.get(`/api/company/${company}`)
			.then((response) => {
				console.log("company ", response.data);
				setCompany(response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getTeams = (company) => {
		Axios.get(`/api/team/allteams/${company}`)
			.then(response => {
				console.log('teams company api thing',response);
				setTeams(response.data);
			})
			.catch(err => {
				console.log('err', err);
			})
	}

	useEffect(() => {
		getCompany(props.user.company);
		getTeams(props.user.company);
	}, [open]);

	const deleteUser = (event) => {
		const target = event.currentTarget.name;
		console.log("delete called", target);
		Axios.delete(`/api/employee/delete/${target}`)
			.then((response) => {
				console.log(response);
				setStatus("Successfully deleted user!");
				setSeverity("success");
				setOpen(true);
			})
			.catch((err) => {
				setStatus("An error has occurred, please retry.");
				setSeverity("error");
				setOpen(true);
				console.log(err);
			});
	};

	const deleteTeam = (event) => {
		const target = event.currentTarget.name;
		console.log('team delete', target);
		Axios.delete(`/api/team/delete/${target}`)
			.then(response => {
				console.log('deleted team response', response);
				window.location.reload();
			})
			.catch(err => {
				console.log('error', err);
			});
	}

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Container>
				<Grid
					container
					direction="row"
					justify="space-evenly"
					alignItems="center"
				>
					<Grid item xs={12} sm={5}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="center"
						>
							<Grid item xs style={{ textAlign: "center" }}>
								<Typography variant="h4">Add Team</Typography>
								<Tooltip
									title="Add Team"
									component="button"
									key={"create"}
									component="a"
									href="/admin/teams/addteam"
								>
									<Fab color="primary" className={classes.fab}>
										<Add />
									</Fab>
								</Tooltip>
							</Grid>
							<Grid item>
								{company.employees ? (
									<List
									subheader={
										<ListSubheader color="inherit">Employees</ListSubheader>
									}
									className={classes.empList}
								>
									{teams.map((item) => (
										<ListItem button key={item._id}>
											<ListItemText
												primary={item.name}
											/>
											<ListItemSecondaryAction>
					
													<Tooltip
														title="Delete"
														component="button"
														value={item._id}
														name={item._id}
														onClick={deleteTeam}
													>
														<IconButton>
															<Delete color="secondary" />
														</IconButton>
													</Tooltip>

											</ListItemSecondaryAction>
										</ListItem>
									))}
								</List>
								):(
									<h1>Test</h1>
								)}
							</Grid>
						</Grid>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item xs={12} sm={5}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="center"
						>
							<Grid item xs style={{ textAlign: "center" }}>
								<Typography variant="h4">Add Employee</Typography>
								<Tooltip
									title="Add Employee"
									component="button"
									key={"create"}
									component="a"
									href="/admin/teams/addemployee"
								>
									<Fab color="primary" className={classes.fab}>
										<Add />
									</Fab>
								</Tooltip>
							</Grid>
							<Divider />
							<Grid item>
								{company.employees ? (
									<List
										subheader={
											<ListSubheader color="inherit">Employees</ListSubheader>
										}
										className={classes.empList}
									>
										{company.employees.map((item) => (
											<ListItem button key={item._id}>
												<ListItemText
													primary={item.firstName + " " + item.lastName}
												/>
												<ListItemSecondaryAction>
													{item.isManager && (
														<Tooltip title="Manager">
															<BuildSharp color="primary" />
														</Tooltip>
													)}
													{props.user._id !== item._id && (
														<Tooltip
															title="Delete"
															component="button"
															value={item._id}
															name={item._id}
															onClick={deleteUser}
														>
															<IconButton>
																<Delete color="secondary" />
															</IconButton>
														</Tooltip>
													)}
												</ListItemSecondaryAction>
											</ListItem>
										))}
									</List>
								) : (
									<Grid item xs>
										<CircularProgress />
									</Grid>
								)}
								<Snackbar
									open={open}
									autoHideDuration={3000}
									onClose={handleClose}
								>
									<Alert onClose={handleClose} severity={severity}>
										{status}
									</Alert>
								</Snackbar>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
