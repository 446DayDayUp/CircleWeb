import React, { Component } from 'react';
import './App.css';
import Chat from './component/Chat.js';
import ChatRoomList from './component/ChatRoomList.js';
import JoinedRooms from './component/JoinedRooms.js';
import UserProfile from './component/UserProfile.js';
import CreateChatRoomForm from './component/CreateChatRoomForm.js';
import * as http from './lib/http.js';
import { getGpsCord } from './lib/gps.js';
import { Tabs, Tab, Panel } from 'react-bootstrap';

const io = require('socket.io-client');
// const SERVER_URL = 'http://localhost:8000';
const SERVER_URL = 'https://circle-chat.herokuapp.com';  // For deployment


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: 3,
      joinedRooms: [],
      userName: 'unknown',
      iconName: 'pikachu-2',
    }
    this.updateNearbyChatRoom = this.updateNearbyChatRoom.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.quitChatRoom = this.quitChatRoom.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    // Get current position(lat, lng);
    this.updateNearbyChatRoom();
  }

  handleTabSelect(tabKey) {
    this.setState({tabKey});
  }

  updateProfile(userData) {
    this.setState(userData);
  }

  // TODO: simplify logic.
  joinChatRoom(room) {
    room.socket = io(SERVER_URL);
    room.socket.emit('room', room._id);
    this.setState({
      joinedRooms: [
        ...this.state.joinedRooms,
        room,
      ],
    })
    this._joinedRoom.addRoom(room);
  }

  quitChatRoom(room) {
    room.socket.disconnect();
    this.setState({
      joinedRooms: this.state.joinedRooms.filter((joined) => {
        return joined._id !== room._id;
      }),
    });
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
            <Tab eventKey={1} title='Profile'>
              <UserProfile updateProfile={this.updateProfile}/>
            </Tab>
            <Tab eventKey={2} title='Joined'>
              <JoinedRooms ref={(list) => this._joinedRoom = list}
                quitChatRoom={this.quitChatRoom}/>
            </Tab>
            <Tab eventKey={3} title='Nerby'>
              <ChatRoomList ref={(list) => this._roomList = list}
                joinChatRoom={this.joinChatRoom}/>
            </Tab>
            <Tab eventKey={4} title='Create'>
              <CreateChatRoomForm updateRooms={this.updateNearbyChatRoom}/>
            </Tab>
          </Tabs>
        </Panel>
        <Panel style={{position: 'absolute', left: '30%', width: '70%', height: '100%'}}>
          <Tabs activeKey={this.state.chatTabKey} onSelect={this.handleChatSelect} id='chatTab'>
            {this.state.joinedRooms.map((room, index) => {
              return (
                <Tab eventKey={index} title={room.name} key={room._id}>
                  <Chat socket={room.socket} id={room._id} userName={this.state.userName} iconName={this.state.iconName}/>
                </Tab>
                );
            })}
          </Tabs>
        </Panel>
      </div>
    );
  }
}

export default App;
