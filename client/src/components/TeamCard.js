import React from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';

export default function TeamCard(props) {
	return (
		<Grid item xs={4}>
			<Card>
				<CardContent>
					<Typography variant="h3" color="textSecondary" gutterBottom>
						{props.title}
					</Typography>
					<Typography variant="p">{props.content}</Typography>
				</CardContent>
				<CardActions>
					<Button variant="outlined" size="small">View Team</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
