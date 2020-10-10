import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Checkbox,
	Container,
	Typography,
	FormGroup,
	FormControlLabel,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody
} from "@material-ui/core";
import Axios from 'axios';

export default function ScopeCard(props) {
	const [scope, setScope] = useState({});
	const [form, setForm] = useState({});
	const { id } = useParams();

	useEffect(() => {
		// eslint-disable-next-line
		props.projects.map((project) => {
			// eslint-disable-next-line
			project.scope.map((scope) => {
				if (scope._id === id) {
					setScope(scope);
				}
			});
		});
	}, [props, id]);

	const handleChange = (event) => {
		Axios.put(`/api/project/scope/task/status/${event.currentTarget.name}`)
			.then(response => {
				console.log('task complete API', response);
				window.location.reload();
			})
			.catch(err => {
				console.log('error', err);
			});
	};

	//console.log(scope);

	return (
		<Container>
			<Typography variant="h2">Scope: {scope.scopeName}</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography color="textPrimary">Task Status</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">Task Name</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">Task Description</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textPrimary">Task Due Date</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{scope.task &&
						scope.task.map((task) => (
							<TableRow key={task._id}>
								<TableCell>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox onChange={handleChange} name={task._id} color="primary" />
											}
											label={<Typography color="textPrimary">{task.isComplete ? ('Complete') : ('In Progress')}</Typography>}
											checked={task.isComplete}
											color="textPrimary"
										/>
									</FormGroup>
								</TableCell>
								<TableCell>
									<Typography color="textPrimary">{task.task}</Typography>
								</TableCell>
								<TableCell>
									<Typography color="textPrimary">{task.description}</Typography>
								</TableCell>
								<TableCell>
									<Typography color="textPrimary">{task.dueDate}</Typography>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</Container>
	);
}
