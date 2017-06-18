import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  onDrop = file => {
    // TODO: need to send image to server
    this.setState({images: [...this.state.images, file[0]]})
    //this.props.socket.emit('chat', this.props.id, this.props.userName, this.props.iconName, file[0]);
  }

	render() {
    // TODO: need to migrate to chatMsgs
    const style = {
      height: '100px',
      width: '100px',
    };
		return (
      <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop}>
  		  <ul id="messages">
  		    {this.props.chatMsgs.map((msg, i) =>
  		      <li key={i}>
  		        <img className='portrait' alt='portrait' src={require(`../assets/${msg.userName ===
  		          this.props.userName ? this.props.iconName : msg.iconName}.png`)}/>
  		        <span>{msg.userName}: {msg.text}</span>
  		      </li>)}
  		  </ul>
        <ul>
          {this.state.images.map((img, i) =>
            <li><img alt="i" src={img.preview} style={style}/></li>
            )}
        </ul>
      </Dropzone>
    );
	}
}

export default ChatPanel;