import React, { Component } from 'react';
import './Chat.css';
import { FormGroup, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap';

class JoinedRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'unknown',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  handleNameChange(event) {
    let userName = event.target.value;
    this.setState({userName});
  }

  updateProfile() {
    this.props.updateProfile({
      userName: this.state.userName,
    });
  }

  render() {
    return (
      <form>
        <FormGroup id='formControlsText'>
          <ControlLabel>User Name</ControlLabel>
          <FormControl type='text' value={this.state.userName} onChange={this.handleNameChange}/>
        </FormGroup>
        <Button bsStyle='primary' onClick={this.updateProfile}>
          Submit
        </Button>
      </form>
    );
  }
}

export default JoinedRooms;