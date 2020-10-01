import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Axios from "axios";

export default function ProjectInfo(props) {
	const location = useLocation();

	const { id } = useParams();
	const project = {};

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
			<h1>{id}</h1>
		</Container>
	);
}
