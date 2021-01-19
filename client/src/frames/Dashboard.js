import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
	makeStyles,
	Drawer,
	AppBar,
	Toolbar,
	List,
	CssBaseline,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	IconButton,
	Grid,
	Typography,
} from "@material-ui/core";
import {
	ChevronLeft,
	ChevronRight,
	Menu,
	DashboardOutlined,
	// eslint-disable-next-line
	SupervisorAccountOutlined,
	ExitToAppOutlined,
	Group,
	// eslint-disable-next-line
	Mail,
	// eslint-disable-next-line
	SettingsOutlined,
	// eslint-disable-next-line
	DeleteOutlineOutlined,
} from "@material-ui/icons";
import Axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	appBarRight: {
		marginTop: theme.spacing(0.75),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function DashBoard(props) {
	const [open, setOpen] = useState(false);
	const [company, setCompany] = useState({});
	const classes = useStyles();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/";
	};

	const getCompany = (company) => {
		Axios.get(`/api/company/${company}`)
			.then((response) => {
				setCompany(response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (props.user.isManager) {
			getCompany(props.user.company);
		}
	}, [props]);

	return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							<Grid item>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									className={clsx(classes.menuButton, {
										[classes.hide]: open,
									})}
								>
									<Menu />
								</IconButton>
							</Grid>
							<Grid item>
								<Typography variant="h4">{company.name}</Typography>
							</Grid>
							<Grid item>
								<Button
									className={classes.appBarRight}
									color="inherit"
									onClick={handleLogout}
								>
									Logout <ExitToAppOutlined />
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerClose}>
							{props.theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem button key={"dashboard"} component="a" href="/home">
							<ListItemIcon name="teams">
								<DashboardOutlined />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItem>
						<Divider />
						{props.user.isManager && (
							<div>
								<ListItem button key={"admin"} component="a" href="/admin">
									<ListItemIcon>
										<SettingsOutlined />
									</ListItemIcon>
									<ListItemText primary={"Projects"} />
								</ListItem>
								<ListItem button key={"teamadmin"} component="a" href="/admin/teams">
									<ListItemIcon>
										<Group />
									</ListItemIcon>
									<ListItemText primary={"User Management"} />
								</ListItem>
							</div>
						)}
						{/* <ListItem button key={"allmail"} component="a" href="/mail">
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary={"All Mail"} />
						</ListItem>
						<ListItem button key={"trashmail"} component="a" href="/trash">
							<ListItemIcon>
								<DeleteOutlineOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={"Trash"} />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button key={"settings"} component="a" href="/settings">
							<ListItemIcon>
								<SettingsOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={"Settings"} />
						</ListItem> */}
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
				</main>
			</div>
	);
}
