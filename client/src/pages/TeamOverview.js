import React, { useEffect, useState } from "react";
import Axios from 'axios';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TeamCard from "../components/TeamCard";

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
					<Box>{children}</Box>
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
	root: {
		flexGrow: 1,
		position: "fixed",
		left: "72px",
		top: "64px",
		width: "100%",
	},
	appBarBG: {
		backgroundColor: "#333333",
	},
}));

export default function TeamOverview(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [scopes, setScopes] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		const target = event.currentTarget.name;
		getProjects(target);
	};

	const getProjects = (target) => {
		Axios.get(`/api/project/${target}`)
		.then((response) => {
			setScopes(response.data[0].scope);
		})
		.catch(err => {
			console.log('error', err);
		});
	}

	useEffect(()=>{
		if(props.projects.length > 0){
			getProjects(props.projects[0]._id);
		}
	},[props]);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="project-tabs"
				>
					{props.projects.length>0 && props.projects.map((item, index) => (
						<Tab label={item.title} name={item._id} {...a11yProps(index)} key={item._id} />
					))}
				</Tabs>
			</AppBar>
			{props.projects.length>0 && props.projects.map((project, index) => (
				<TabPanel value={value} index={index} key={project._id}>
					<Grid container spacing={3}>
						{scopes.map((item) => (
								<TeamCard title={item.scopeName} content={item.dueDate} key={item._id}/>
						))}
						{project.scope.length<1 && 
							<Typography>This project has no scopes!</Typography>
						}
					</Grid>
				</TabPanel>
			))}
		</div>
	);
}
