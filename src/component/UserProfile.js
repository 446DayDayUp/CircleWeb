import React, { Component } from 'react';
import $ from 'jquery';
import './Chat.css';
import { FormGroup, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap';
import profilePictures from '../lib/profilePictures.js';

class JoinedRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'unknown',
      iconName: 'pikachu-2',
    };
  }

  handleNameChange = event => {
    let userName = event.target.value;
    this.setState({userName});
  }

  handleImageChange = event => {
    let iconName = event.target.alt;
    this.setState({iconName});
  }

  updateProfile = () => {
    this.props.updateProfile({
      userName: this.state.userName,
      iconName: this.state.iconName,
    });
  }

  render() {
    const profileImages = profilePictures.map((img, i) =>
      <li key={i}>
        <img className={this.state.iconName === img ? 'selected' : ''} alt={img} src={require(`../assets/${img}.png`)} onClick={this.handleImageChange}/>
      </li>
    );
    return (
      <form>
        <FormGroup id='formControlsText'>
          <ControlLabel>User Name</ControlLabel>
          <FormControl type='text' value={this.state.userName} onChange={this.handleNameChange}/>
        </FormGroup>
        <div className='profileImages'>
          <ul>{profileImages}</ul>
        </div>
        <Button bsStyle='primary' onClick={this.updateProfile}>
          Submit
        </Button>
      </form>
    );
  }
}

export default JoinedRooms;