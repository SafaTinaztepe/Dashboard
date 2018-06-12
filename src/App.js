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
      chats: [],
      data: '' 
    };
  }

  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });

    const pusher = new Pusher('459202bd6ee274316ace', {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });

    this.handleTextChange = this.handleTextChange.bind(this);

    const dataChannel = pusher.subscribe('data');
    dataChannel.bind('input', data => {
      this.setState({data:data});
    });
    this.receiveData = this.receiveData.bind(this);
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
	    <DataBox data={this.state.data} />
	</section>
      </div>
    );
  }
}

export default App;
