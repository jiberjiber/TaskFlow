import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Divider, Fab } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

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
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	},
  }))(TableRow);

export default function Admin(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Grid className={classes.m25}>
				<Grid item xs style={{ textAlign: "center" }}>
					<Typography variant="h4">New Project</Typography>
					<Tooltip title="Add">
						<Fab color="primary" className={classes.fab}>
							<AddIcon />
						</Fab>
					</Tooltip>
				</Grid>
			</Grid>
			<Divider />
			<Container className={classes.m50}>
					<Table aria-label="projects-table">
						<TableHead>
							<TableRow>
								<StyledTableCell>
									<Typography color="textPrimary">Project ID</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Project Name</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Teams</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Due Date</Typography>
								</StyledTableCell>
								<StyledTableCell>
									<Typography color="textPrimary">Actions</Typography>
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.projects.map((project) => (
								<TableRow key={project.id}>
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
										<Tooltip title="Delete">
											<IconButton>
												<DeleteIcon color="secondary" />
											</IconButton>
										</Tooltip>
									</StyledTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
			</Container>
		</div>
	);
}