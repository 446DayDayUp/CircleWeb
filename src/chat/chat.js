import React, { Component } from 'react';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {msg: ''};
    this.handleChange = this.handleChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.socket = this.props.socket;
  }
  handleChange(event) {
    this.setState({msg: event.target.value});
  }
  sendMsg() {
    this.socket.emit('chat', this.state.msg);
    this.setState({msg: ''});
  }
  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <div id="form">
          <input id="msg"
            autoComplete="off"
            value={this.state.msg}
            onChange={this.handleChange}/>
          <button onClick={this.sendMsg}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
