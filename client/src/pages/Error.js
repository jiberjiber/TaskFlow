import React from "react";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";

export default function Error() {
	return (
		<Container>
			<Typography variant="h2" color="error">An error has occurred.</Typography>
			<Typography component="a" href="/" variant="button" color="textPrimary">Please return to the dashboard.</Typography>
		</Container>
	);
}
