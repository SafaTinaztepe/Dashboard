import React, { Component } from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/MotorSb.css";

class MotorSb extends Component{
  constructor(props){
    super(props);
    this.state = {
      rpm: props.rmp,
      motor_temp: props.motor_temp,
      coolant_temp: props.coolant_temp,
      elock: props.elock,
      pump: props.pump
    }
  }

  render(){
    return(
    <table className='motor_widget-body'>
      <tbody>
      <tr>
        <td className="motor_tablecell">
          <table border={1}>
    	<tbody>
    	<tr>
    	  <th>
    	    Rotations Per Minute
    	  </th>
    	  <th>
    	    Motor Temperature (C)
    	  </th>
    	  <th>
    	    Coolant Temperature (C)
    	  </th>
    	  <th>
    	    E Lock
    	  </th>
    	  <th>
    	    Pump
    	  </th>
    	</tr>
    	<tr>
    	  <td>
    	    {this.state.rpm}
    	  </td>
    	  <td>
      	    {this.state.motor_temp}
    	  </td>
    	  <td>
    	    {this.state.coolant_temp}
    	  </td>
    	  <td class={this.state.elock}>
    	  </td>
    	  <td class={this.state.pump}>
    	  </td>
    	</tr>
    	</tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="motor_tablecell motor_label">
          <span>
    	     Starboard Motor
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    )
  }
}

export default MotorSb;
