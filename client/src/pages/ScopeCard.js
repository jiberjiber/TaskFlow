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

export default function ScopeCard(props) {
	const [scope, setScope] = useState({});
	const [form, setForm] = useState({});
	const { id } = useParams();

	useEffect(() => {
		props.projects.map((project) => {
			project.scope.map((scope) => {
				if (scope._id === id) {
					setScope(scope);
				}
			});
		});
	}, [props, id]);

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.checked });
		console.log("new state", form);
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
												<Checkbox onChange={handleChange} name={task._id} color="secondary" />
											}
											label="status"
										/>
									</FormGroup>
								</TableCell>
								<TableCell>
									<Typography color="textPrimary">{task.task}</Typography>
								</TableCell>
								<TableCell>
									<Typography color="textPrimary">{task.description}</Typography>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</Container>
	);
}
