import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
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

export default function EmployeeOverview(props) {
	const classes = useStyles();

	const [tasks, setTasks] = useState([]);

	const getTeams = (props) => {
		if(props.user._id){
			Axios.get('/api/team')
			.then((response) => {
				console.log('Employee API Response', response);
				getScopes(props);	
			})
			.catch((err) => {
				console.log(err);
			});
		}
		
	}

	const getScopes = (props) => {
		Axios.get('/api/project/scope')
			.then(response => {
				console.log('Scope API Response', response);
			})
			.catch(err => {
				console.log(err);
			});
	}

	useEffect(()=>{
		getTeams(props);
	},[props]);

	return (
		<div className={classes.root}>
			<Container className={classes.mt25}>
				<Table aria-label="projects-table">
					<TableHead>
						<TableRow>
							<StyledTableCell>
								<Typography color="textPrimary">Task Name</Typography>
							</StyledTableCell>
							<StyledTableCell>
								<Typography color="textPrimary">Task Due Date</Typography>
							</StyledTableCell>
							<StyledTableCell>
								<Typography color="textPrimary">Scope</Typography>
							</StyledTableCell>
							<StyledTableCell>
								<Typography color="textPrimary">Scope Due Date</Typography>
							</StyledTableCell>
							<StyledTableCell>
								<Typography color="textPrimary">Task ID</Typography>
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.projects.map((project) => (
							<StyledTableRow key={project.id}>
								<StyledTableCell>
									<Typography color="textPrimary">{project.id}</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">{project.title}</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">
										{project.teams.map((team) => team.title + ", ")}
									</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Jan 1, 1970</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Tooltip title="Open Project" component="a" href={"/project/" + project.id}>
										<IconButton>
											<LaunchIcon color="action" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Manage" component="a" href={"/project/" + project.id + "/manage"}>
										<IconButton>
											<SettingsIcon color="action" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete" component="a" href={"/project/" + project.id + "/delete"}>
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
		</div>
	);
}
