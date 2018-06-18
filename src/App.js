import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
import Controller1 from './components/Controller';
import PduController from './components/PduController';
import MotorSb from './components/MotorSb';
import Chart from './components/Chart';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: [],
      knob_sb:-1,
      knob_bb:-1,
      knob_fw_sb:-1,
      knob_fw_bb:-1,
      knob_bw_sb:-1,
      knob_bw_bb:-1,
      current_sb:-1
    };
  }


  componentDidMount() {
    this.handleTextChange = this.handleTextChange.bind(this);

    var username = "username";
    this.setState({ username:username, data:'data'});
    const pusher = new Pusher('459202bd6ee274316ace', {
      cluster: 'eu',
      encrypted: true
    });

    // data pipeline channels
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: ''});
    });


    const dataChannel = pusher.subscribe('data');
    dataChannel.bind('input', data => {
      this.setState({data: data});
    });

    dataChannel.bind('controller', data => {
      this.setState({knob_sb	     : data.knob_sb,
      	      	     knob_bb       : data.knob_bb,
      	      	     knob_fw_sb    : data.knob_fw_sb,
      	      	     knob_fw_bb	   : data.knob_fw_bb,
      	             knob_bw_sb    : data.knob_bw_sb,
      	             knob_bw_bb    : data.knob_bw_bb});
    });

    dataChannel.bind('pdu', data => {
      this.setState({current_sb    : data.current_sb,
            		     current_bb	   : data.current_bb,
            		     v12_bus 	     : data.v12_bus,
            		     v12_battery   : data.v12_battery,
            		     v48_bus	     : data.v48_bus,
            		     v48_dcdc      : data.v48_dcdc});
    });

    dataChannel.bind('motorsb', data => {
      this.setState({rmp           : data.rpm,
               	     motor_temp    : data.motor_temp,
            		     coolant_temp  : data.coolant_temp,
             		     elock    	   : data.elock,
            		     pump	         : data.pump});
    });

    dataChannel.bind('motorbb', data => {
      this.setState({rmp           : data.rpm,
               	     motor_temp    : data.motor_temp,
            		     coolant_temp  : data.coolant_temp,
             		     elock    	   : data.elock,
            		     pump	         : data.pump});});
    });

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Future Home of Humphry API</h1>
        </header>

	<section className='dataSection'>
	    <ul>
	      <li>
	        <Controller1
	    	  knob_sb={this.state.knob_sb}
	    	  knob_bb={this.state.knob_bb}
	    	  knob_fw_sb={this.state.knob_fw_sb == '1' ? 'on' : 'off'}
	          knob_fw_bb={this.state.knob_fw_bb == '1' ? 'on' : 'off'}
	          knob_bw_sb={this.state.knob_bw_sb == '1' ? 'on' : 'off'}
	          knob_bw_bb={this.state.knob_bw_bb == '1' ? 'on' : 'off'}
	   	/>
	      </li>
	      <li>
	        <PduController
	          current_sb={this.state.current_sb}
	          current_bb={this.state.current_bb}
	          v12_bus={this.state.v12_bus}
	          v12_battery={this.state.v12_battery}
	          v48_bus={this.state.v48_bus}
	          v48_dcdc={this.state.v48_dcdc}
	        />
	      </li>
	      <li>
	       <MotorSb
  	        rpm={this.state.rpm}
  	    	  motor_temp={this.state.motor_temp}
  	    	  coolant_temp={this.state.coolant_temp}
  	    	  elock={this.state.elock == '1' ? 'on' : 'off'}
  	    	  pump={this.state.pump == '1' ? 'on' : 'off'}
	       />
	      </li>
	      <li>
          <MotorBb
            rpm={this.state.rpm}
            motor_temp={this.state.motor_temp}
            coolant_temp={this.state.coolant_temp}
            elock={this.state.elock == '1' ? 'on' : 'off'}
            pump={this.state.pump == '1' ? 'on' : 'off'}
         />
	      </li>

	   </ul>
	</section>

        <section className='chat'>
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
          <ChatList chats={this.state.chats} />
        </section>


      </div>
    );
  }
}

export default App;
