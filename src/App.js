import React, { Component } from 'react';
import Chat from './chat/Chat.js';
import ChatRoomList from './chat/ChatRoomList.js';
import JoinedRooms from './chat/JoinedRooms.js';
import './App.css';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';
import { Tabs, Tab, Panel } from 'react-bootstrap';
import CreateChatRoomForm from './chat/CreateChatRoomForm.js';

const io = require('socket.io-client');
const SERVER_URL = 'http://localhost:8000';
const connectionOptions = {
    'force new connection': true,
    'reconnectionAttempts': 'Infinity',
    'timeout': 10000,
    'transports': ['websocket'],
};

const socket = io('localhost:8000', connectionOptions);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: 2,
    }
    this.updateNearbyChatRoom = this.updateNearbyChatRoom.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.quitChatRoom = this.quitChatRoom.bind(this);
    // Get current position(lat, lng);
    this.updateNearbyChatRoom();
  }

  handleTabSelect(tabKey) {
    this.setState({tabKey});
  }

  joinChatRoom(room) {
    this._joinedRoom.addRoom(room);
  }

  quitChatRoom(room) {
    this._roomList.quitRoom(room);
  }

  updateNearbyChatRoom() {
    getGpsCord().then(function(location) {
      http.get(SERVER_URL, 'get-chat-rooms', {
        lat: location.lat,
        lng: location.lng,
        range: 5000,
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        this._roomList.updateRooms(json);
      }.bind(this));
    }.bind(this));
      if (this.refs.tabs) {
        this.handleTabSelect(2);
      }
  }

  render() {
    return (
      <div>
        <Panel style={{position: 'absolute', width: '30%', height: '100%'}}>
          <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabSelect}
            id='tab' className='roomTab' ref='tabs'
            >
            <Tab eventKey={1} title='Joined'>
              <JoinedRooms ref={(list) => this._joinedRoom = list}
                quitChatRoom={this.quitChatRoom}/>
            </Tab>
            <Tab eventKey={2} title='Nerby'>
              <ChatRoomList ref={(list) => this._roomList = list}
                joinChatRoom={this.joinChatRoom}/>
            </Tab>
            <Tab eventKey={3} title='Create'>
              <CreateChatRoomForm updateRooms={this.updateNearbyChatRoom}/>
            </Tab>
          </Tabs>
        </Panel>
        <Panel style={{position: 'absolute', left: '30%', width: '70%', height: '100%'}}>
          <div>
            <Chat socket={socket}/>
          </div>
        </Panel>
      </div>
    );
  }
}

export default App;
