import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<<<<<<< HEAD
    <div>
      <App />
      </div>,
    
  
=======
  <React.StrictMode>
	  <App />
  </React.StrictMode>,
>>>>>>> 7a94e4afb2a53862aebbe632ebd7b3cd5081be9e
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
