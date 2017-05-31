import React, { Component } from 'react';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      chatMsgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.socket = this.props.socket;
    this.socket.on('chat', function(sid, msg){
      console.log('receved msg: ', msg)
      this.setState({
        chatMsgs: [...this.state.chatMsgs, msg],
      });
    }.bind(this));
  }
  handleChange(event) {
    this.setState({msg: event.target.value});
  }
  sendMsg() {
    console.log(this.props.id, this.state.msg)
    this.socket.emit('chat', this.props.id, this.state.msg);
    this.setState({msg: ''});
  }
  render() {
    return (
      <div>
        <ul id="messages">
          {this.state.chatMsgs.map((msg, i) => <li key={i}>{msg}</li>)}
        </ul>
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
