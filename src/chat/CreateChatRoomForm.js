import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as http from '../lib/http.js';
import { getGpsCord } from '../lib/gps.js';
import { FormGroup, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap';

const SERVER_URL = 'https://circle-chat.herokuapp.com';

export default class CreateChatRoomForm extends Component {
  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.renderTagsCheckbox = this.renderTagsCheckbox.bind(this);
    this.Tags = [
      'Study',
      'Game',
      'Sport',
      'Food',
    ];
    this.selectedTags = {};
  }

  createRoom() {
    // Get current location.
    getGpsCord().then(function(location) {
      let name = ReactDOM.findDOMNode(this.refs.roomName).value;
      let tags = Object.keys(this.selectedTags);
      let range = ReactDOM.findDOMNode(this.refs.range).value;
      http.post(SERVER_URL, 'create-chat-room', {
        name,
        tags,
        range,
        lat: location.lat,
        lng: location.lng,
      }).then(function() {
        ReactDOM.findDOMNode(this.refs.roomName).value = 0;
        ReactDOM.findDOMNode(this.refs.range).value = 50;
        this.props.updateRooms();
      }.bind(this)).catch(function(error) {
        console.log('error', error);
    });
    }.bind(this));
  }

  renderTagsCheckbox(tag) {
    return (
      <Checkbox inline
        key={tag}
        onChange={() => {
          if (this.selectedTags[tag]) delete this.selectedTags[tag];
          else this.selectedTags[tag] = true;
        }}>
        {tag}
      </Checkbox>
    )
  }

  render() {
    return (
      <form>
        <FormGroup id='formControlsText'>
          <ControlLabel>Chat Room Name</ControlLabel>
          <FormControl type='text' placeholder='my chat room' ref='roomName'/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tags</ControlLabel>
          <br/>
          {this.Tags.map(this.renderTagsCheckbox)}
        </FormGroup>
        <FormGroup controlId='rangeSelect'>
          <ControlLabel>Range</ControlLabel>
          <FormControl componentClass='select' placeholder='range' ref='range'>
            <option value={50}>50m</option>
            <option value={200}>200m</option>
            <option value={500}>500m</option>
            <option value={1000}>1km</option>
            <option value={2000}>2km</option>
            <option value={5000}>5km</option>
            <option value={10000}>10km</option>
          </FormControl>
        </FormGroup>

        <Button bsStyle='primary' onClick={this.createRoom}>
          Submit
        </Button>
      </form>
      );
    }
}