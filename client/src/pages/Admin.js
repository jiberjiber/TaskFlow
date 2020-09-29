import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Divider, Fab } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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
}));

const columns = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'numTeams', label: 'ISO\u00a0Code', minWidth: 100 },
	{
	  id: 'population',
	  label: 'Population',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toLocaleString('en-US'),
	},
	{
	  id: 'size',
	  label: 'Size\u00a0(km\u00b2)',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toLocaleString('en-US'),
	},
	{
	  id: 'density',
	  label: 'Density',
	  minWidth: 170,
	  align: 'right',
	  format: (value) => value.toFixed(2),
	},
  ];

export default function Admin(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Grid>
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
			<Table>

			</Table>
		</div>
	);
}
