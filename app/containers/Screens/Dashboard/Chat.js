import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { SOCKET_URL } from '../../../constants/ServerUrl';

// socket
import socketIOClient from 'socket.io-client';

// import css
import "./Chat.scss";

class Chat extends Component {
   
  constructor(props){
    super(props);

    this.state = {
        user: props.user,
        message: '',
        messages: props.tweetList,
        endpoint: SOCKET_URL,
        twid: props.twid,
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = (data) => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        // console.log(this.state.messages);
    };

    this.sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            id: this.state.twid,
            name: this.state.user.name,
            text: this.state.message
        });
        this.setState({message: ''});

    };
  }

  componentWillMount(){       
    
  }  
      
  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    const messageDiv = document.getElementById("messageId");
    messageDiv.scrollTop = messageDiv.scrollHeight;
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  enterPressed = (event) => {    
    var code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
      //Do stuff in here
      // console.log('enter');
      this.sendMessage(event);
    } 
  }
    
  render() {
    
    return (
      <Fragment>
        <div className="box box-primary">
          <div className="box-body">
            <div id="messageId" className="messages">
              {this.state.messages.map((message, index) => {
                  return (
                    <div 
                        key={index}
                      >
                      { 
                        message.author === this.state.user.name
                        ?
                        <div style={{textAlign: 'right'}}>
                          <span className="message_text_self" >{message.body}</span>
                        </div>
                        :
                        <div>
                          <span className="message_text">{message.body}</span>  
                        </div>                    
                      }         
                    </div>                      
                  );
              })}              
            </div>
            
            </div>
            <div className="box-footer">
              {/* <input 
                type="text" 
                placeholder="Username"
                className="form-control"
                value={this.state.username} 
                onChange={ev => this.setState({username: ev.target.value})}                 
              /> */}
              <div> <strong> {this.state.user.name}... </strong></div>
              <br/>
              <input 
                type="text" 
                placeholder="Message" 
                className="form-control" 
                value={this.state.message} 
                onChange={ev => this.setState({message: ev.target.value})}
                onKeyPress = {this.enterPressed}
              />
              <br/>
              <Button
                block
                color="secondary"                 
                onClick={this.sendMessage}
                >
                Send
              </Button>
            </div>
        </div>        
      </Fragment>
    );
  }
}

export default Chat;
