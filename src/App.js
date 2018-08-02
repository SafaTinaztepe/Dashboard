import React, { Component } from "react";
import axios from "axios";
import Controller from "./components/Controller";
import PduController from "./components/PduController";
import MotorSb from "./components/MotorSb";
import MotorBb from "./components/MotorBb";
import Switch from "./components/Switch";
import socketIOClient from "socket.io-client";
import "./App.css";


/*eslint-disable*/
class App extends Component {
  constructor(data) {
    super(data);
    this.state = {
      knob_sb: -1,
      knob_bb: -1,
      knob_sb_fw: -1,
      knob_bb_fw: -1,
      knob_sb_bw: -1,
      knob_bb_bw: -1,
      current_sb: -1,
      current_bb: -1,
      v12_bus: -1,
      v12_battery: -1,
      v48_bus: -1,
      v48_dcdc: -1,
      rpm_sb: -1,
      motor_temp_sb: -1,
      coolant_temp_sb: -1,
      elock_sb: -1,
      pump_sb: -1,
      rpm_bb: -1,
      motor_temp_bb: -1,
      coolant_temp_bb: -1,
      elock_bb: -1,
      pump_bb: -1,
      battery: -1,
      fuel_cell: -1,
      charger: -1,
      sw4: -1,
      sw5: -1,
      sw6: -1,
      sw7: -1,
      sw8: -1,
      endpoint: "http://192.168.43.224:5000/",
      socket: socketIOClient("http://192.168.43.224:5000/")
    };

    var self = this;
    axios.get(this.state.endpoint + "api/data/controller", {headers:{'Accept':'application/json','Access-Control-Allow-Origin': 'http://192.168.43.224:4350'}})
    .then(function(res){
      //console.log(res);

      self.setState({
        knob_sb: res.data[0].knob_sb,
        knob_bb: res.data[0].knob_bb,
        knob_sb_fw: res.data[0].knob_sb,
        knob_sb_bw: res.data[0].knob_sb,
        knob_bb_fw: res.data[0].knob_bb_fw,
        knob_bb_bw: res.data[0].knob_bb_bw
      });

      document.querySelector(`#knob_sb_input`).value = self.state.knob_sb;
      document.querySelector(`#knob_bb_input`).value = self.state.knob_bb;
      document.querySelector(`#knob_sb_slider`).value = self.state.knob_sb;
      document.querySelector(`#knob_bb_slider`).value = self.state.knob_bb;
      self.drawChart("knob_sb", self.state.knob_sb_fw, self.state.knob_sb);
      self.drawChart("knob_bb", self.state.knob_bb_fw, self.state.knob_bb);
    })
    .catch(function (err){
      throw(err);
    });

    const endpoints = ['controller', 'pdu', 'motorsb', 'motorbb', 'switch'];
    endpoints.map(function(ctrl) {
      axios.get(self.state.endpoint + "api/data/" + ctrl)
           .then(function(res){
             var data_in = res.data[0]
             Object.keys(data_in).map(function(key){
               self.setState({key:data_in[key]}, ()=>console.log());

             });
             self.drawChart("knob_sb", self.state.knob_sb_fw, self.state.knob_sb);
             self.drawChart("knob_bb", self.state.knob_bb_fw, self.state.knob_bb);
           })
           .catch(function(err){
             throw(err);
           });
    });

  }

  componentDidMount() {
    this.drawChart = this.drawChart.bind(this);
    this.textInputHandler = this.textInputHandler.bind(this);
    this.slideInputHandler = this.slideInputHandler.bind(this);

    var socket = this.state.socket;

    socket.on("echo", function(payload) {
      console.log(payload);
    });

    socket.on("controller", data => {
      data = JSON.parse(data);
      this.setState({
        knob_sb: data.knob_sb-510,
        knob_bb: data.knob_bb-510,
        knob_sb_fw: data.knob_sb_fw,
        knob_sb_bw: data.knob_sb_bw,
        knob_bb_fw: data.knob_bb_fw,
        knob_bb_bw: data.knob_bb_bw,
        slideInputHandler: this.slideInputHandler.bind(this),
        textInputHandler: this.textInputHandler.bind(this)
      });

      document.querySelector(`#knob_sb_input`).value = this.state.knob_sb;
      document.querySelector(`#knob_bb_input`).value = this.state.knob_bb;
      document.querySelector(`#knob_sb_slider`).value = this.state.knob_sb;
      document.querySelector(`#knob_bb_slider`).value = this.state.knob_bb;

      this.drawChart("knob_sb", this.state.knob_sb_fw, this.state.knob_sb);
      this.drawChart("knob_bb", this.state.knob_bb_fw, this.state.knob_bb);
    });

    socket.on("pdu", data => {
      data = JSON.parse(data);
      this.setState({
        current_sb: data.current_sb,
        current_bb: data.current_bb,
        v12_bus: data.v12_bus,
        v48_bus: data.v48_bus,
        v48_dcdc: data.v48_dcdc,
        v12_battery: data.v12_battery
      });
    });

    socket.on("motorsb", data => {
      data = JSON.parse(data);
      this.setState({
        rpm_sb: data.rpm,
        pump_sb: data.pump,
        elock_sb: data.elock,
        motor_temp_sb: data.motor_temp,
        coolant_temp_sb: data.coolant_temp
      });
    });

    socket.on("motorbb", data => {
      data = JSON.parse(data);
      this.setState({
        rpm_bb: data.rpm,
        pump_bb: data.pump,
        elock_bb: data.elock,
        motor_temp_bb: data.motor_temp,
        coolant_temp_bb: data.coolant_temp
      });
    });

    socket.on("switch", data => {
      data = JSON.parse(data);
      this.setState({
        battery: data.battery,
        fuel_cell: data.fuel_cell,
        charger: data.charger,
        sw4: data.sw4,
        sw5: data.sw5,
        sw6: data.sw6,
        sw7: data.sw7,
        sw8: data.sw8
      });
    });
  }

  // local function for Controller component
  drawChart(component, sw, value) {
    var proportion = value / 1024;
    proportion * sw == "1" ? 1 : -1;
    var c = document.querySelector(`#${component}_chart`);
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.save();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.restore();
    ctx.arc(
      100, // x
      75, // y
      50, // r
      -Math.PI / 2, // start angle
      proportion * 2 * Math.PI - Math.PI / 2, // end angle
      sw == 1 // reversed?
    );
    ctx.strokeStyle = "#205116";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = "30px Georgia";
    ctx.fillStyle = "black";

    var txt = Math.round(100*(proportion),2)+'%';
    var dim = ctx.measureText(txt);

    ctx.fillText(txt, (c.width-dim.width)/2, (c.height/2)+7.5);
    ctx.stroke();
    ctx.closePath();
  }

  textInputHandler(e) {
    if (e.keyCode === 13) {
      var slider = e.target;
      var target = document.querySelector(`${slider.name}_slider`);
      if (isNaN(Number(e.target.value)) || (-1024 > e.target.value || e.target.value > 1024)) return;
      slider.value = e.target.value;
      var sw = Boolean(e.target.value >= 0 ? 0 : 1);
      var body;
      if (slider.name === "knob_sb") {
        body = {
          knob_sb: e.target.value,
          knob_bb: this.state.knob_bb,
          knob_sb_fw: sw,
          knob_sb_bw: !sw,
          knob_bb_fw: Boolean(this.state.knob_bb_fw),
          knob_bb_bw: Boolean(this.state.knob_bb_bw)
        };
      } else if (slider.name === "knob_bb") {
        body = {
          knob_sb: this.state.knob_sb,
          knob_bb: e.target.value,
          knob_sb_fw: Boolean(this.state.knob_sb_fw),
          knob_sb_bw: Boolean(this.state.knob_sb_bw),
          knob_bb_fw: sw,
          knob_bb_bw: !sw
        };
      }
      var payload = JSON.stringify(body);
      axios.post(this.state.endpoint + "api/data/controller", body);
    }
  }

  slideInputHandler(e) {
    var slider = e.target;
    var target = document.querySelector(`#${slider.name}_input`);
    target.value = slider.value;
    var sw = Boolean(slider.value >= 0 ? 0 : 1);
    var body;
    if (slider.name === "knob_sb") {
      body = {
        knob_sb: slider.value,
        knob_bb: this.state.knob_bb,
        knob_sb_fw: sw,
        knob_sb_bw: !sw,
        knob_bb_fw: Boolean(this.state.knob_bb_fw),
        knob_bb_bw: Boolean(this.state.knob_bb_bw)
      };
    } else if (slider.name === "knob_bb") {
      body = {
        knob_sb: this.state.knob_sb,
        knob_bb: slider.value,
        knob_sb_fw: Boolean(this.state.knob_sb_fw),
        knob_sb_bw: Boolean(this.state.knob_sb_bw),
        knob_bb_fw: sw,
        knob_bb_bw: !sw
      };
    }
    var payload = JSON.stringify(body);
    axios.post(this.state.endpoint + "api/data/controller", body);

  }


  render() {
    return (
      <div className="App">
        <section>
          <table className="dataSection">
          <tbody>
            <tr>
              <td>
              <Controller
                knob_sb={this.state.knob_sb}
                knob_bb={this.state.knob_bb}
                knob_sb_fw={this.state.knob_sb_fw == "1" ? "on" : "off"}
                knob_bb_fw={this.state.knob_bb_fw == "1" ? "on" : "off"}
                knob_sb_bw={this.state.knob_sb_bw == "1" ? "on" : "off"}
                knob_bb_bw={this.state.knob_bb_bw == "1" ? "on" : "off"}
                drawChart={this.drawChart.bind(this)}
                slideInputHandler={this.slideInputHandler.bind(this)}
                textInputHandler={this.textInputHandler.bind(this)}
              />
              </td>

              <td>
              <PduController
                v12_bus={this.state.v12_bus}
                v48_bus={this.state.v48_bus}
                v48_dcdc={this.state.v48_dcdc}
                current_sb={this.state.current_sb}
                current_bb={this.state.current_bb}
                v12_battery={this.state.v12_battery}
              />
              </td>
            </tr>
            <tr>
              <td className="gridrow">
              <MotorSb
                rpm={this.state.rpm_sb}
                pump={this.state.pump_sb == "1" ? "on" : "off"}
                elock={this.state.elock_sb == "1" ? "on" : "off"}
                motor_temp={this.state.motor_temp_sb}
                coolant_temp={this.state.coolant_temp_sb}
              />
              </td>
              <td className="gridrow">
              <MotorBb
                rpm={this.state.rpm_bb}
                pump={this.state.pump_bb == "1" ? "on" : "off"}
                elock={this.state.elock_bb == "1" ? "on" : "off"}
                motor_temp={this.state.motor_temp_bb}
                coolant_temp={this.state.coolant_temp_bb}
              />
              </td>

            </tr>
            <tr>
              <td className="gridrow">
              <Switch
                battery={this.state.battery == "1" ? "on" : "off"}
                fuel_cell={this.state.fuel_cell == "1" ? "on" : "off"}
                charger={this.state.charger == "1" ? "on" : "off"}
                sw4={this.state.sw4 == "1" ? "on" : "off"}
                sw5={this.state.sw5 == "1" ? "on" : "off"}
                sw6={this.state.sw6 == "1" ? "on" : "off"}
                sw7={this.state.sw7 == "1" ? "on" : "off"}
                sw8={this.state.sw8 == "1" ? "on" : "off"}
              />
            </td>
          </tr>
          </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
