import React, { Component } from "react";
import "../stylesheets/ChatList.css";
import avatar from "../avatar.png";

class ChatList extends Component{

  constructor(props){
    super(props);
    this.state = {
      chats: props.chats
    }
  }

  render(){
    return(
    <ul>
      {this.state.chats.map(chat => {
        return (
          <div>
            <div className="row show-grid">
              <div className="col-xs-12">

                <div className="chatMessage">
                  <div key={chat.id} className="box">
                    <p>
                      <strong>{chat.username}</strong>
                    </p>
                    <p><span className="chatId">{this.state.chats.indexOf(chat)+1}</span>{chat.message}</p>
                  </div>

                  <div className="imageHolder">
                  <img src={avatar} className="img-responsive avatar" alt="logo" />
                </div>
                </div>
              </div>
            </div>
          </div>
        );
      }).reverse()}
    </ul>
    )
  }
}

export default ChatList
