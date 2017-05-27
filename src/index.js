import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
const io = require('socket.io-client');
ReactDOM.render(<App />, document.getElementById('root'));
var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};
const socket = io('circle-chat.herokuapp.com', connectionOptions)
registerServiceWorker();
