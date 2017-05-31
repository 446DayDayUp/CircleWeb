import React, { Component } from 'react';
import './Chat.css';
import { Button, ListGroupItem, ListGroup } from 'react-bootstrap';

class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: [],
    };
    this.allRooms = [];
    this.joinedRooms = [];
    this.renderRoom = this.renderRoom.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
  }

  joinChatRoom(room) {
    this.props.joinChatRoom(room);
    this.joinedRooms.push(room);
    this.updateRooms();
  }

  renderTag(tag) {
    return <i key={tag}>#{tag} </i>
  }

  quitRoom(room) {
    this.joinedRooms = this.joinedRooms.filter((joined) => {
      return joined._id !== room._id;
    });
    this.updateRooms();
  }

  renderRoom(room) {
    return (
      <ListGroupItem key={room._id}
        header={room.name}>
        {room.tags ? room.tags.map(this.renderTag) : null}
        <br/>
        {room.distance}m
        <br/>
        <Button bsStyle="primary" bsSize="xsmall"
          onClick={() => this.joinChatRoom(room)}>
          Join Chat Room
        </Button>
      </ListGroupItem>
    );
  }

  updateRooms(rooms) {
    // UpdateRooms withou passing rooms means
    // only joined rooms are updated, no new rooms
    // are found.
    if (rooms) {
      this.allRooms = rooms;
    } else {
      rooms = this.allRooms;
    }
    this.setState({
      chatRooms: rooms.filter(function(room) {
        // Filtered result equals to 0 if room not in joinedRoom.
        return this.joinedRooms.filter((joined) => {
          return room._id === joined._id;
        }).length === 0;
      }.bind(this))
    });
  }

  render() {
    return (
      <ListGroup>
        {this.state.chatRooms.map(this.renderRoom)}
      </ListGroup>
    );
  }
}

export default ChatRoomList;
