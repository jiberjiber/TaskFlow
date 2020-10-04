import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
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
	AppBar,
	Tabs,
} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
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
	m50: {
		margin: "50px",
	},
}));

export default function ProjectInfo(props) {
	const { id } = useParams();

	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
				<Grid container direction="column" justify="space-around" alignItems="center">
					<Typography variant="body1">In Progress</Typography>
					<CircularProgressWithLabel value={progress} />
				</Grid>
			</Grid>
			<Grid
				container
				alignItems="flex-start"
				justify="space-evenly"
				className={classes.mainDisplayGrid}
			>
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
				<Box>
					<AppBar position="static">
						<Tabs
							value="value"
							onChange={handleChange}
							aria-label="project-scope-tabs"
						>
							<Tab label="Front-End" {...a11yProps(0)} />
							<Tab label="Back-End" {...a11yProps(1)} />
							<Tab label="QA/Testing" {...a11yProps(2)} />
						</Tabs>
					</AppBar>
					<TabPanel value="bungus" index={0}>
						Front End Tasks
					</TabPanel>
					<TabPanel value="value" index={1}>
						Back End Tasks
					</TabPanel>
					<TabPanel value="value" index={2}>
						QA/Testing Tasks
					</TabPanel>
				</Box>
			</Grid>
		</Container>
	);
}
