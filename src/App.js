import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import Controller1 from './Controller1';
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
      this.setState({data: data});
    });

    dataChannel.bind('controller1', data => {
      this.setState({knob_sb	   : data.knob_sb,
	      	     knob_bb       : data.knob_bb,
	             knob_switch_sb: data.knob_switch_sb,
      		     knob_switch_bb: data.knob_switch_bb});
    });
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

	<section className='dataSection'>
	    <ul>
	      <li>
	        <Controller1
	    	  knob_sb={this.state.knob_sb}
	    	  knob_bb={this.state.knob_bb}
	    	  knob_switch_sb={this.state.knob_switch_sb}
	          knob_switch_bb={this.state.knob_switch_bb}
	   	/>
	      </li>
	    </ul>
	</section>
      </div>
    );
  }
}

export default App;
