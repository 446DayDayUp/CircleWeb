import React, { Component } from 'react';
import Chat from './chat/chat.js';
import './App.css';
import * as http from './lib/http.js';

const io = require('socket.io-client');

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};

const socket = io('localhost:8000', connectionOptions)

class App extends Component {
  constructor(props) {
    super(props);
    // Get current position(lat, lng);
      console.log('ctor')
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log('get location')
      http.get('http://localhost:8000', 'get-chat-rooms', {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        range: 3000
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log('Request successful', json);
        this.setState({chatRooms: json});
      }.bind(this));
    }.bind(this), function(err) {
      console.log('err: ', err);
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  }
  render() {
    return (
      <Chat socket={socket}></Chat>
    );
  }
}

export default App;
