// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
	Grid,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	FormGroup,
	FormControlLabel,
	Checkbox,
	withStyles,
	makeStyles,
} from "@material-ui/core";

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
	const [teams, setTeams] = useState([]);
	const classes = useStyles();

	console.log("props", props);

	const getTeams = (props) => {
		if (props.user._id) {
			Axios.get("/api/team")
				.then((response) => {
					console.log("Employee API Response", response.data);
					setTeams(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		getTeams(props);
		// eslint-disable-next-line
	}, [props]);

	const handleChange = (event) => {
		
		Axios.put(`/api/project/scope/task/status/${event.currentTarget.name}`)
			.then(response => {
				//console.log('task complete API', response);
				window.location.reload();
			})
			.catch(err => {
				console.log('error', err);
			});
	};

	return (
		<div className={classes.root}>
			<Container className={classes.mt25}>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="flex-start"
				>
					{teams.map((team) => (
						<Grid
							item
							xs={12}
							sm={6}
							style={{ paddingBottom: "50px" }}
							key={team._id}
						>
							<Typography variant="h3">{team.name}</Typography>
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
							>
								{team.assignedScope.length > 0 ? (
									team.assignedScope.map((scope) => (
										<Grid item key={scope._id}>
											<Typography variant="h6">{scope.scopeName}</Typography>
											<TableContainer component="paper">
												<Table>
													<TableHead>
														<TableRow>
															<StyledTableCell>
																<Typography>Status</Typography>
															</StyledTableCell>
															<StyledTableCell>
																<Typography>Name</Typography>
															</StyledTableCell>
															<StyledTableCell>
																<Typography>Description</Typography>
															</StyledTableCell>
															<StyledTableCell>
																<Typography>Due Date</Typography>
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{scope.task.map((task) => (
															<StyledTableRow key={task._id}>
																<TableCell>
																	<FormGroup>
																		<FormControlLabel
																			control={
																				<Checkbox
																					onChange={handleChange}
																					name={task._id}
																					color="primary"
																				/>
																			}
																			checked={task.isComplete}
																			color="textPrimary"
																		/>
																	</FormGroup>
																</TableCell>
																<TableCell>
																	<Typography color="inherit">
																		{task.task}
																	</Typography>
																</TableCell>
																<TableCell>
																	<Typography color="textPrimary">
																		{task.description}
																	</Typography>
																</TableCell>
																<TableCell>
																	<Typography color="textPrimary">
																		{task.dueDate}
																	</Typography>
																</TableCell>
															</StyledTableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</Grid>
									))
								) : (
									<Typography variant="h6">Team has no scopes!</Typography>
								)}
							</Grid>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
