// eslint-disable-next-line
import React, { useState } from "react";
import Axios from 'axios';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Divider, Fab } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import SettingsIcon from '@material-ui/icons/Settings';
import LaunchIcon from '@material-ui/icons/Launch';

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
	const classes = useStyles();

	const deleteProject = (event) => {
		const target = event.currentTarget.value;
		console.log('project delete called', target);
		Axios.delete(`/api/project/${target}`)
			.then(response => {
				console.log('delete response', response);
				window.location.reload();
			})
			.catch(err => {
				console.log('error', err);
			})
	}
	
	return (
		<div className={classes.root}>
			<Grid className={classes.m25}>
				<Grid item xs style={{ textAlign: "center" }}>
					<Typography variant="h4">New Project</Typography>
					{/* eslint-disable-next-line*/}
					<Tooltip title="Add" component="button" key={"create"} component="a" href="/create">
						<Fab color="primary" className={classes.fab}>
							<AddIcon />
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
							{props.projects.map((project) => (
								<StyledTableRow key={project._id}>
									<StyledTableCell>
										<Typography color="textPrimary">{project.title}</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">{project.dueDate}</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">{project.isComplete ? ("Complete") : ("In Progress")}</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Typography color="textPrimary">{project.creator}</Typography>
									</StyledTableCell>
									<StyledTableCell>
										<Tooltip title="Open Project" component="a" href={"/project/" + project._id}>
											<IconButton>
												<LaunchIcon color="action" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Manage" component="a" href={"/project/" + project._id + "/manage"}>
											<IconButton>
												<SettingsIcon color="action" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" component="button" value={project._id} name={project._id} onClick={deleteProject}>
											<IconButton>
												<DeleteIcon color="secondary" />
											</IconButton>
										</Tooltip>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</Container>
			) : (
					<Grid 
						container 
						spacing={0} 
						direction="column"
						alignItems="center"
						justify="center"
					>
						<CircularProgress />
					</Grid>
				)}
		</div>
	);
}
