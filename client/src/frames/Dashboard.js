import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import MailIcon from "@material-ui/icons/Mail";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
// eslint-disable-next-line
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
	Grid,
	ThemeProvider,
	createMuiTheme,
	useMediaQuery,
} from "@material-ui/core";

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
	const classes = useStyles();

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const darkTheme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/login";
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<Grid justify="space-between" container>
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
									<MenuIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<Typography variant="h4">
									Welcome, {props.user.firstName}!
								</Typography>
							</Grid>
							<Grid item>
								<Button
									className={classes.appBarRight}
									color="inherit"
									onClick={handleLogout}
								>
									Logout <ExitToAppOutlinedIcon />
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
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem button key={"dashboard"} component="a" href="/">
							<ListItemIcon name="teams">
								<DashboardOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={"Dashboard"} />
						</ListItem>
						{props.user.isManager && (
							<ListItem button key={"admin"} component="a" href="/admin">
								<ListItemIcon>
									<SupervisorAccountOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Admin"} />
							</ListItem>
						)}

						<Divider />
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
						</ListItem> */}
					</List>
					{/* <Divider /> */}
					<List>
						<ListItem button key={"settings"} component="a" href="/settings">
							<ListItemIcon>
								<SettingsOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={"Settings"} />
						</ListItem>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
				</main>
			</div>
		</ThemeProvider>
	);
}
