import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
import Controller from './components/Controller';
import PduController from './components/PduController';
import MotorSb from './components/MotorSb';
import MotorBb from './components/MotorBb';
import logo from './logo.svg';
import './App.css';

/*eslint-disable*/
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
      current_sb:-1,
      current_bb :-1,
      v12_bus 	 :-1,
      v12_battery:-1,
      v48_bus	 :-1,
      v48_dcdc   :-1,
      rpm_sb:-1,
      motor_temp_sb:-1,
      coolant_temp_sb:-1,
      elock_sb:-1,
      pump_sb:-1,
      rpm_bb           : -1,
      motor_temp_bb    : -1,
      coolant_temp_bb  : -1,
      elock_bb         : -1,
      pump_bb          : -1
    };
  }


  componentDidMount() {

    this.handleTextChange = this.handleTextChange.bind(this);
    this.drawChart = this.drawChart.bind(this);
    this.handleDbChange = this.handleDbChange.bind(this);


    // chat function
    var username = "username";
    this.setState({ username:username, data:'data'});

    // init charts
    this.drawChart('knob_sb', this.state.knob_sb);
    this.drawChart('knob_bb', this.state.knob_bb);

    // will get rid of this soon
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
      this.setState({knob_sb	   : data.knob_sb,
      	      	     knob_bb       : data.knob_bb,
      	      	     knob_fw_sb    : data.knob_fw_sb,
      	      	     knob_fw_bb	   : data.knob_fw_bb,
      	             knob_bw_sb    : data.knob_bw_sb,
      	             knob_bw_bb    : data.knob_bw_bb});

	    // if both switches are on, stagnate
      //if(this.state.knob_fw_sb || !this.state.knob_bw_sb) this.setState({knob_sb: 0});
      //if(this.state.knob_fw_bb || !this.state.knob_bw_bb) this.setState({knob_bb: 0});

      this.drawChart('knob_sb', this.state.knob_fw_sb, this.state.knob_sb);
      this.drawChart('knob_bb', this.state.knob_fw_bb, this.state.knob_bb);
    });

    dataChannel.bind('pdu', data => {
      this.setState({current_sb    : data.current_sb,
            	     current_bb	   : data.current_bb,
            	     v12_bus 	   : data.v12_bus,
            	     v12_battery   : data.v12_battery,
            	     v48_bus	   : data.v48_bus,
            	     v48_dcdc      : data.v48_dcdc});
    });

    dataChannel.bind('motorsb', data => {
      this.setState({rpm_sb           : data.rpm,
               	     motor_temp_sb    : data.motor_temp,
            	     coolant_temp_sb  : data.coolant_temp,
             	     elock_sb         : data.elock,
            	     pump_sb	      : data.pump});
    });

    dataChannel.bind('motorbb', data => {
      this.setState({rpm_bb           : data.rpm,
               	     motor_temp_bb    : data.motor_temp,
            	     coolant_temp_bb  : data.coolant_temp,
             	     elock_bb         : data.elock,
            	     pump_bb          : data.pump})
    });

  }

  // TODO: Compare the performance of fetch versus axios.get
  handleDbChange(ctrl) {
    fetch(`http://192.168.178.152:5000/api/data/${ctrl}`, {
      method: 'GET'
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad news");
      }
      return response.json();
    }).then((data) => {
        this.setState({knob_sb: data.knob_sb,
                      knob_bb: data.knob_bb,
                      knob_fw_sb: data.knob_fw_sb,
                      knob_fw_bb: data.knob_fw_bb,
                      knob_bw_sb: data.knob_bw_sb,
                      knob_bw_bb: data.knob_bw_bb});

    }).catch(function(err) {
      console.log(err);
    });
  }


  // local function for ChatBox component
  handleTextChange(e) {
    console.log(this.state.text);
    if (e.keyCode === 13 || e.type === 'click') {
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

  // local function for Controller component
  drawChart(component, sw, value){
    var proportion = value/1024;
    proportion *= sw == '0' ? 1 : -1
    var c = document.querySelector(`#${component}`);
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.beginPath();

    ctx.arc(100, 75, 50, 0, 2*Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // draw arced arrow
    ctx.beginPath();
    ctx.arc(100, 75, 50, -Math.PI/2,  proportion*2*Math.PI - Math.PI/2, sw == '1');
    ctx.strokeStyle = '#205116';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = '30px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText(value, 80, 75);

    ctx.font = '15px Georgia';
    ctx.fillStyle = 'gray';
    ctx.fillText('1024', 80, 100);

    ctx.closePath();
  }

  render() {
    return (
      <div className="App">

	<section className='dataSection'>
	    <ul>
	      <li>
	        <Controller
  	    	  knob_sb   ={this.state.knob_sb}
  	    	  knob_bb   ={this.state.knob_bb}
  	    	  knob_fw_sb={this.state.knob_fw_sb == '1' ? 'on' : 'off'}
            knob_fw_bb={this.state.knob_fw_bb == '1' ? 'on' : 'off'}
            knob_bw_sb={this.state.knob_bw_sb == '1' ? 'on' : 'off'}
            knob_bw_bb={this.state.knob_bw_bb == '1' ? 'on' : 'off'}
            handleDbChange={this.handleDbChange.bind(this)}
            drawChart={this.drawChart.bind(this)}
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
    	       rpm={this.state.rpm_sb}
    	     	 motor_temp={this.state.motor_temp_sb}
    	    	 coolant_temp={this.state.coolant_temp_sb}
    	    	 elock={this.state.elock_sb == '1' ? 'on' : 'off'}
    	    	 pump={this.state.pump_sb == '1' ? 'on' : 'off'}
	        />
	      </li>
	      <li>
          <MotorBb
             rpm={this.state.rpm_bb}
             motor_temp={this.state.motor_temp_bb}
             coolant_temp={this.state.coolant_temp_bb}
             elock={this.state.elock_bb == '1' ? 'on' : 'off'}
             pump={this.state.pump_bb == '1' ? 'on' : 'off'}
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
