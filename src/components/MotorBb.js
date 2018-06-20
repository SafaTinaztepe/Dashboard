import React, { Component } from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/MotorSb.css";

class MotorBb extends Component{
  constructor(props){
    super(props);
    this.state = {
      rpm: props.rpm,
      motor_temp: props.motor_temp,
      coolant_temp: props.coolant_temp,
      elock: props.elock,
      pump: props.pump
    }
  }
  componentDidMount(){
    this.setState({
      rpm: this.props.rpm,
      motor_temp: this.props.motor_temp,
      coolant_temp: this.props.coolant_temp,
      elock: this.props.elock,
      pump: this.props.pump
    });
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
    	    {this.props.rpm}
    	  </td>
    	  <td>
      	    {this.props.motor_temp}
    	  </td>
    	  <td>
    	    {this.props.coolant_temp}
    	  </td>
    	  <td className={this.props.elock}>
    	  </td>
    	  <td className={this.props.pump}>
    	  </td>
    	</tr>
    	</tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="motor_tablecell motor_label">
          <span>
    	     Backboard Motor
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    )
  }
}

export default MotorBb;
