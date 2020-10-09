import React from 'react';
import {
    Button,
    Snackbar,
    makeStyles
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorDialog(props) {
    
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="error">
                An error has occurred, please retry.
       			 </Alert>
        </Snackbar>
    );
}