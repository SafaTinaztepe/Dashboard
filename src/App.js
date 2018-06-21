import React, { Component } from 'react';
import axios from 'axios';
import Controller from './components/Controller';
import PduController from './components/PduController';
import MotorSb from './components/MotorSb';
import MotorBb from './components/MotorBb';
import socketIOClient from 'socket.io-client';
import './App.css';

/*eslint-disable*/
class App extends Component {
  constructor(data) {
    super(data);
    this.state = {
      knob_sb          : -1,
      knob_bb          : -1,
      knob_sb_fw       : -1,
      knob_bb_fw       : -1,
      knob_sb_bw       : -1,
      knob_bb_bw       : -1,
      current_sb       : -1,
      current_bb       : -1,
      v12_bus 	       : -1,
      v12_battery      : -1,
      v48_bus	         : -1,
      v48_dcdc         : -1,
      rpm_sb           : -1,
      motor_temp_sb    : -1,
      coolant_temp_sb  : -1,
      elock_sb         : -1,
      pump_sb          : -1,
      rpm_bb           : -1,
      motor_temp_bb    : -1,
      coolant_temp_bb  : -1,
      elock_bb         : -1,
      pump_bb          : -1,
      endpoint         : 'http://192.168.178.152:5000/',
      socket           : socketIOClient('http://192.168.178.152:5000/')
    };
  }


  componentDidMount() {

    this.drawChart = this.drawChart.bind(this);
    this.textInputHandler = this.textInputHandler.bind(this);
    this.slideInputHandler = this.slideInputHandler.bind(this);

    var socket = this.state.socket;

    socket.on('echo', function(payload){
      console.log(payload);
    });

    socket.on('controller', data => {
      data = JSON.parse(data);
      this.setState({knob_sb    : data.knob_sb,
                     knob_bb    : data.knob_bb,
                     knob_sb_fw : data.knob_sb_fw,
                     knob_sb_bw : data.knob_sb_bw,
                     knob_bb_fw : data.knob_bb_fw,
                     knob_bb_bw : data.knob_bb_bw,
                     slideInputHandler : this.slideInputHandler.bind(this),
                     textInputHandler  : this.textInputHandler.bind(this)});


      this.drawChart('knob_sb', this.state.knob_sb_fw, this.state.knob_sb);
      this.drawChart('knob_bb', this.state.knob_bb_fw, this.state.knob_bb);
    });

    socket.on('pdu', data => {
      data = JSON.parse(data);
      this.setState({current_sb    : data.current_sb,
              	     current_bb	   : data.current_bb,
              	     v12_bus 	     : data.v12_bus,
              	     v48_bus	     : data.v48_bus,
              	     v48_dcdc      : data.v48_dcdc,
                     v12_battery   : data.v12_battery});
    });

    socket.on('motorsb', data => {
      data = JSON.parse(data);
      this.setState({rpm_sb           : data.rpm,
              	     pump_sb	        : data.pump,
                     elock_sb         : data.elock,
                     motor_temp_sb    : data.motor_temp,
                     coolant_temp_sb  : data.coolant_temp});
    });

    socket.on('motorbb', data => {
      data = JSON.parse(data);
      this.setState({rpm_bb           : data.rpm,
              	     pump_bb          : data.pump,
                     elock_bb         : data.elock,
                     motor_temp_bb    : data.motor_temp,
                     coolant_temp_bb  : data.coolant_temp});
    });

  }

  // local function for Controller component
  drawChart(component, sw, value){
    var proportion = value/1024;
    proportion * sw=='1' ? 1 : -1;
    var c = document.querySelector(`#${component}_chart`);
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.beginPath();
    ctx.save()
    ctx.arc(100, 75, 50, 0, 2*Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // draw arced arrow
    ctx.beginPath();
    ctx.restore();
    ctx.arc(100, 75, 50, -Math.PI/2,  proportion*2*Math.PI - Math.PI/2, sw==1);
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
  // TODO: subtract common logic from handlers, maybe make a class
  textInputHandler(e) {
    if(e.keyCode === 13) {
      var slider_target = e.target.id.substring(0,7);
      var slider = document.querySelector(`input#${slider_target}`);
      slider.value = e.target.value;
      var sw = Boolean(e.target.value >= 0 ? 0 : 1);
      var body;
      if(slider.id === 'knob_sb'){
        body = {knob_sb:e.target.value,knob_bb:this.state.knob_bb, knob_sb_fw:sw, knob_sb_bw:!sw, knob_bb_fw:Boolean(this.state.knob_bb_fw), knob_bb_bw:Boolean(this.state.knob_bb_bw)};
      }
      else if(slider.id === 'knob_bb'){
        body = {knob_sb:this.state.knob_sb,knob_bb:e.target.value, knob_sb_fw:Boolean(this.state.knob_sb_fw), knob_sb_bw:Boolean(this.state.knob_sb_bw), knob_bb_fw:sw, knob_bb_bw:!sw};
      }
      var payload = JSON.stringify(body);
      axios.post(this.state.endpoint+'api/data/controller', body);
    }
  }


  slideInputHandler(e){
    var slider = e.target;
    var target = document.querySelector(`#${slider.id}_target`);
    target.value = slider.value;
    var sw = Boolean(slider.value >= 0 ? 0 : 1);
    console.log(this.state.knob_sb_fw);
    var body;
    if(slider.id === 'knob_sb'){
      body = {knob_sb:slider.value,knob_bb:this.state.knob_bb, knob_sb_fw:sw, knob_sb_bw:!sw, knob_bb_fw:Boolean(this.state.knob_bb_fw), knob_bb_bw:Boolean(this.state.knob_bb_bw)};
    }
    else if(slider.id === 'knob_bb'){
      body = {knob_sb:this.state.knob_sb,knob_bb:slider.value, knob_sb_fw:Boolean(this.state.knob_sb_fw), knob_sb_bw:Boolean(this.state.knob_sb_bw), knob_bb_fw:sw, knob_bb_bw:!sw};
    }
    var payload = JSON.stringify(body);
    axios.post(this.state.endpoint+'api/data/controller', body);
  }


  render() {
    return (
      <div className="App">

	    <section className='dataSection'>
	    <ul>
	      <li>
	        <Controller
  	    	  knob_sb     = {this.state.knob_sb}
  	    	  knob_bb     = {this.state.knob_bb}
  	    	  knob_sb_fw  = {this.state.knob_sb_fw == '1' ? 'on' : 'off'}
            knob_bb_fw  = {this.state.knob_bb_fw == '1' ? 'on' : 'off'}
            knob_sb_bw  = {this.state.knob_sb_bw == '1' ? 'on' : 'off'}
            knob_bb_bw  = {this.state.knob_bb_bw == '1' ? 'on' : 'off'}
            drawChart   = {this.drawChart.bind(this)}
            slideInputHandler = {this.slideInputHandler.bind(this)}
            textInputHandler = {this.textInputHandler.bind(this)}
	   	    />
	      </li>
	      <li>
	        <PduController
	          v12_bus     = {this.state.v12_bus}
	          v48_bus     = {this.state.v48_bus}
	          v48_dcdc    = {this.state.v48_dcdc}
            current_sb  = {this.state.current_sb}
            current_bb  = {this.state.current_bb}
            v12_battery = {this.state.v12_battery}
	        />
	      </li>
	      <li>
	        <MotorSb
  	        rpm          = {this.state.rpm_sb}
  	    	  pump         = {this.state.pump_sb  == '1' ? 'on' : 'off'}
            elock        = {this.state.elock_sb == '1' ? 'on' : 'off'}
            motor_temp   = {this.state.motor_temp_sb}
            coolant_temp = {this.state.coolant_temp_sb}
	        />
	      </li>
	      <li>
          <MotorBb
            rpm          = {this.state.rpm_bb}
            pump         = {this.state.pump_bb  == '1' ? 'on' : 'off'}
            elock        = {this.state.elock_bb == '1' ? 'on' : 'off'}
            motor_temp   = {this.state.motor_temp_bb}
            coolant_temp = {this.state.coolant_temp_bb}
          />
	      </li>
        <button className={'btn btn-success'} onClick={()=>axios.post(this.state.endpoint+'api/echo', 'echo')}>Click me!</button>
	    </ul>
	    </section>
      </div>
    );
  }
}

export default App;
