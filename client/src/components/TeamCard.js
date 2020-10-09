import React from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';

export default function TeamCard(props) {

	console.log(props);
	return (
		<Grid item xs={4}>
			<Card>
				<CardContent>
					<Typography variant="h3" gutterBottom>
						{props.scope.scopeName}
					</Typography>
					<Typography variant="caption">Due Date: {props.scope.dueDate}</Typography>
				</CardContent>
				<CardActions>
					<Button variant="contained" size="small" component="a" href={`/scope/${props.scope._id}`}>View Tasks</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
