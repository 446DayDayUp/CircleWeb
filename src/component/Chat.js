import React, { Component } from 'react';
import './Chat.css';
import ChatPanel from './ChatPanel.js';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      chatMsgs: []
    };
    this.socket = this.props.socket;
    this.socket.on('chat', (sid, userName, iconName, msg) => {
      this.setState({
        chatMsgs: [...this.state.chatMsgs, {
          sid,
          userName,
          iconName,
          text: msg,
        }]});
    });
  }

  handleChange = event => {
    this.setState({msg: event.target.value});
  }

  sendMsg = () => {
    console.log(this.props.id, this.state.msg)
    this.socket.emit('chat', this.props.id, this.props.userName, this.props.iconName, this.state.msg);
    this.setState({msg: ''});
  }

  render() {
    return (
      <div>
        <ChatPanel id={this.props.id} socket={this.props.socket} iconName={this.props.iconName} userName={this.props.userName} chatMsgs={this.state.chatMsgs}/>
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
