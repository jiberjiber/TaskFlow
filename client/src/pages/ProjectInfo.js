import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import {
	Container,
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	Grid,
	Divider,
	makeStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
		width: "fit-content",
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
	m50 :{
		margin: "50px",
	},
}));

export default function ProjectInfo(props) {
	const { id } = useParams();
	const project = {};

	const classes = useStyles();

	// Do calcs to find progress
	let progress = 60;

	// useEffect(() => {
	// 	Axios.get(`/api/project/:${id}`)
	// 		.then((response) => {
	// 			console.log(response);
	// 			project = response;
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// 	document.title = `WorkHub: ${project.title}`;
	// });

	return (
		<Container>
			<Grid
				container
				alignItems="flex-end"
				justify="center"
				className={classes.headerDisplay}
			>
				<Typography variant="h2">Project Title</Typography>
				<Divider orientation="vertical" flexItem />
				<Grid direction="column" justify="space-around" alignItems="center">
					<Typography variant="body1">In Progress</Typography>
					<CircularProgressWithLabel value={progress} />
				</Grid>
			</Grid>
			<Grid container alignItems="flex-end" justify="space-evenly" className={classes.mainDisplayGrid}>
				<List>
					<ListItem>
						<ListItemText primary="Project ID" secondary={`ID ${id}`} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Project Owner" secondary="Mike" />
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Description"
							secondary="This is about a management software"
						/>
					</ListItem>
					<ListItem>
						<ListItemText primary="Due Date" secondary="October 10, 2020" />
					</ListItem>
				</List>
				<List>
					<ListItem>
						<ListItemText primary="Project ID" secondary={`ID ${id}`} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Project Owner" secondary="Mike" />
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Description"
							secondary="This is about a management software"
						/>
					</ListItem>
					<ListItem>
						<ListItemText primary="Due Date" secondary="October 10, 2020" />
					</ListItem>
				</List>
			</Grid>
		</Container>
	);
}
