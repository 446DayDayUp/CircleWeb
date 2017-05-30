import React, { Component } from 'react';
import './Chat.css';
import { Button, ListGroupItem, ListGroup } from 'react-bootstrap';

class ChatRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: [],
    };
    this.renderRoom = this.renderRoom.bind(this);
  }

  renderTag(tag) {
    return <i key={tag}>#{tag} </i>
  }

  renderRoom(room) {
    return (
      <ListGroupItem key={room._id}
        header={room.name}>
        {room.tags ? room.tags.map(this.renderTag) : null}
        <br/>
        {room.distance}m
        <br/>
        <Button bsStyle="primary" bsSize="xsmall">Join Chat Room</Button>
      </ListGroupItem>
    );
  }

  updateRooms(rooms) {
    this.setState({
      chatRooms: rooms
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
