// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
	withStyles,
	makeStyles,
	Grid,
	IconButton,
	Tooltip,
	Container,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	CircularProgress,
	Divider,
	Fab,
	Snackbar,
} from "@material-ui/core";
import { Add, Delete, Settings, Launch } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBarBG: {
		backgroundColor: "#333333",
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

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

export default function Admin(props) {
	const [projects, setProjects] = useState([]);
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState("");
	const [severity, setSeverity] = useState("info");
	const classes = useStyles();

	const deleteProject = (event) => {
		const target = event.currentTarget.value;
		console.log("project delete", target);
		Axios.delete(`/api/project/${target}`)
			.then((response) => {
				console.log("delete response", response);
				setStatus("Successfully deleted project!");
				setSeverity("success");
				setOpen(true);
				window.location.reload();
			})
			.catch((err) => {
				console.log("error", err);
				setStatus("An error has occurred, please retry.");
				setSeverity("error");
				setOpen(true);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		setProjects(props.projects);
	},[open, props.projects]);

	return (
		<div className={classes.root}>
			<Grid className={classes.m25}>
				<Grid item xs style={{ textAlign: "center" }}>
					<Typography variant="h4">New Project</Typography>
					{/* eslint-disable-next-line*/}
					<Tooltip
						title="Add"
						component="button"
						key={"create"}
						component="a"
						href="/create"
					>
						<Fab color="primary" className={classes.fab}>
							<Add />
						</Fab>
					</Tooltip>
				</Grid>
			</Grid>
			<Divider />
			{props.projects.length ? (
				<Container className={classes.mt25}>
					<Table aria-label="projects-table">
						<TableHead>
							<TableRow>
								<StyledTableCell>
									<Typography color="textPrimary">Project Name</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Due Date</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Status</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Project Manager</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Actions</Typography>
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{projects.map((project) => (
								<StyledTableRow key={project._id}>
									<StyledTableCell>
										<Typography color="textPrimary">{project.title}</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">
											{project.dueDate}
										</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">
											{project.isComplete ? "Complete" : "In Progress"}
										</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">
											{project.creator}
										</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Tooltip
											title="Open Project"
											component="a"
											href={"/project/" + project._id}
										>
											<IconButton>
												<Launch color="action" />
											</IconButton>
										</Tooltip>
										<Tooltip
											title="Manage"
											component="a"
											href={"/project/" + project._id + "/manage"}
										>
											<IconButton>
												<Settings color="action" />
											</IconButton>
										</Tooltip>
										<Tooltip
											title="Delete"
											component="button"
											value={project._id}
											name={project._id}
											onClick={deleteProject}
										>
											<IconButton>
												<Delete color="secondary" />
											</IconButton>
										</Tooltip>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</Container>
			) : (
				<Grid container direction="column" alignItems="center" justify="center">
					<CircularProgress />
				</Grid>
			)}
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{status}
				</Alert>
			</Snackbar>
		</div>
	);
}
