import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Container,
	Box,
	Typography,
	Grid,
	Divider,
	makeStyles,
	withStyles,
	Table,
	TableCell,
	TableRow,
	TableHead,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

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

function CircularProgressWithLabel(props) {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="static" {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography
					variant="caption"
					component="div"
					color="textSecondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const useStyles = makeStyles((theme) => ({
	headerDisplay: {
		"& h2": {
			margin: "10px",
		},
		"& p": {
			margin: "10px",
		},
		"& hr": {
			margin: theme.spacing(0, 0.5),
		},
	},
	mainDisplayGrid: {
		padding: "10%",
	},
	m50: {
		margin: "50px",
	},
	tablePadding: {
		margin: "20px",
	},
}));

export default function ProjectInfo(props) {
	const { id } = useParams();
	const [currentProject, setCurrentProject] = useState({});
	const [progress, setProgress] = useState(0);
	let project = {};

	const classes = useStyles();

	useEffect(() => {
		props.projects.map((item) => {
			if (item._id === id) {
				//console.log(item);
				project = item;
				setCurrentProject(item);
			}
		});

		//console.log("project object", project);
		if (project.title) {
			setProgress(calculateProgress());
		}
	}, [props]);

	// Do calcs to find progress
	const calculateProgress = () => {
		let tasks = [];
		project.scope.map((item) => {
			//console.log(item);
			item.task.map((task) => {
				tasks.push(task);
			});
		});
		//console.log(tasks);
		let total = tasks.length;
		let complete = 0;
		tasks.map((item) => {
			if (item.isComplete === true) {
				complete++;
			}
		});
		//console.log('percent', (complete/total)*100);
		return (complete / total) * 100;
	};

	const deleteScope = (event) => {
		const target = event.currentTarget.name;
		console.log("scope delete called", target);
		Axios.delete(`/api/project/scope/one/${target}`)
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
		window.location.reload();
	};

	const deleteTask = (event) => {
		const target = event.currentTarget.name;
		console.log("task delete called", target);
		Axios.delete(`/api/project/scope/task/one/${target}`)
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
		window.location.reload();
	};

	return (
		<Container>
			<Grid
				container
				alignItems="flex-end"
				justify="center"
				className={classes.headerDisplay}
			>
				<Grid item>
					<Typography variant="h2">{currentProject.title}</Typography>
				</Grid>
				<Divider orientation="vertical" flexItem />
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<Typography variant="h5">
								{currentProject.isComplete ? "Complete" : "In Progress"}
							</Typography>
						</Grid>
						<Grid item>
							<CircularProgressWithLabel value={progress} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<br />
			<br />
			<Table>
				<TableHead>
					<TableRow>
						<StyledTableCell>
							<Typography color="textPrimary">Description</Typography>
						</StyledTableCell>
						<StyledTableCell>
							<Typography color="textPrimary">Owner</Typography>
						</StyledTableCell>
						<StyledTableCell>
							<Typography color="textPrimary">Due Date</Typography>
						</StyledTableCell>
						<StyledTableCell>
							<Typography color="textPrimary">ID</Typography>
						</StyledTableCell>
					</TableRow>
					<StyledTableRow>
						<TableCell>
							<Typography color="textPrimary">
								{currentProject.description}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">
								{currentProject.creator}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">
								{currentProject.dueDate}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">{currentProject._id}</Typography>
						</TableCell>
					</StyledTableRow>
				</TableHead>
			</Table>
			{currentProject.scope &&
				currentProject.scope.map((scope) => (
					<div key={scope._id}>
						<br />
						<br />
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="flex-end"
						>
							<Grid item>
								<Typography variant="h3">Scope: {scope.scopeName}</Typography>
							</Grid>
							<Grid item>
								<Tooltip
									title="Delete"
									component="button"
									name={scope._id}
									onClick={deleteScope}
								>
									<IconButton>
										<DeleteIcon color="secondary" />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell>
										<Typography color="textPrimary">Task Name</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">Description</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">Status</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">ID</Typography>
									</StyledTableCell>
									<StyledTableCell align="right">
										<Typography color="textPrimary">Actions</Typography>
									</StyledTableCell>
								</TableRow>
								{scope.task.map((task) => (
									<StyledTableRow key={task._id}>
										<TableCell>
											<Typography color="textPrimary">{task.task}</Typography>
										</TableCell>
										<TableCell>
											<Typography color="textPrimary">
												{task.description}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography color="textPrimary">
												{task.isComplete ? "Complete" : "In Progress"}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography color="textPrimary">{task._id}</Typography>
										</TableCell>
										<TableCell align="right">
											<Tooltip
												title="Delete"
												component="button"
												name={task._id}
												onClick={deleteTask}
											>
												<IconButton>
													<DeleteIcon color="secondary" />
												</IconButton>
											</Tooltip>
										</TableCell>
									</StyledTableRow>
								))}
							</TableHead>
						</Table>
					</div>
				))}
		</Container>
	);
}
