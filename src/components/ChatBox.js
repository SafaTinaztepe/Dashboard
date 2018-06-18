import React, { Component } from "react";
import '../stylesheets/ChatBox.css';

class ChatBox extends Component{

  constructor(props){
    super(props);
    this.state = {
      text: props.text,
      username: props.username,
      handleTextChange: props.handleTextChange
    }
  }

  render(){
    <div>
      <div className="row">
      <div className="col-xs-12">
        <div className="chat">
          <div className="col-xs-5 col-xs-offset-3">
            <input
              type="text"
              value={this.state.text}
              placeholder="chat here..."
              className="form-control"
              onChange={this.state.handleTextChange}
              onKeyDown={this.state.handleTextChange}
            />
  	      </div>
  	    <div className="col-s-10">
  	      <button onClick={this.state.handleTextChange} id="sendBtn" className="btn btn-success">Send</button>
  	    </div>
        <div className="clearfix"></div>
        </div>
      </div>
      <h4 className="greetings">Hello, User</h4>
      </div>
    </div>
  }

export default ChatBox;
