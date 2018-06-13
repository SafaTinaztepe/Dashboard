import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import DataBox from './DataBox';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: []
    };
  }



  componentDidMount() {
    this.handleTextChange = this.handleTextChange.bind(this);
    this.receiveData = this.receiveData.bind(this);
    this.getDataState = this.getDataState.bind(this);

    var username = "username"; 
    this.setState({ username:username, data:'data'});
    const pusher = new Pusher('459202bd6ee274316ace', {
      cluster: 'eu',
      encrypted: true
    });

    // data pipeline channels
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });

    const dataChannel = pusher.subscribe('data');
    dataChannel.bind('input', data => {
      this.setState({data:data});
    });

    // bind local functions
  } 

  getDataState(){
    var d = axios.get('http://192.168.178.152:5000/api/data');
    return d;
  }

  handleTextChange(e) {
    console.log(e);
    if ((e.keyCode === 13 || e.type === 'click') && this.state.text !== "") {
      const payload = {
        username: this.state.username,
        message: this.state.text
      }; 
      axios.post('http://192.168.178.152:5000/message', payload); 
      this.setState({ text: "" });
    } else {
      this.setState({ text: e.target.value });
    }
  }

  receiveData(data) {
	axios.post('http://192.168.178.152:5000/api/data', data);	
	this.setState({data:data});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Future Home of Humphry API</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          /> 
        </section>

	<section>
	    <DataBox label={"Motor"} data={this.state.data} />
	</section>
      </div>
    );
  }
}

export default App;
