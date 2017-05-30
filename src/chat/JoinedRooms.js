import React, { Component } from 'react';
import './Chat.css';
import { Button, ListGroupItem, ListGroup } from 'react-bootstrap';

class JoinedRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedRooms: [],
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
        <Button bsStyle="primary" bsSize="xsmall"
          onClick={() => this.props.joinChatRoom(room)}>
          Quit
        </Button>
      </ListGroupItem>
    );
  }

  addRoom(room) {
    this.setState({
      joinedRooms: [
        ...this.state.joinedRooms,
        room
      ]
    });
  }

  render() {
    return (
      <ListGroup>
        {this.state.joinedRooms.map(this.renderRoom)}
      </ListGroup>
    );
  }
}

export default JoinedRooms;