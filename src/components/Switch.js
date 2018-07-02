import React, { Component } from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/Switch.css";

class Switch extends Component{
  constructor(props){
    super(props);
    this.state = {battery           : props.battery,
                   fuel_cell          : props.fuel_cell,
                   charger         : props.charger,
                   sw4    : props.sw4,
                   sw5    : props.sw5,
                   sw6    : props.sw6,
                   sw7    : props.sw7,
                   sw8    : props.sw8};
  }
  componentDidUpdate(prevProps,prevState){
  }

  render(){
    return(
    <table className='switch_widget-body' >
      <tbody>

      <tr>
        <td className="switchlt_tablecell">
          <table border={1}>
    	<tbody>
    	<tr>
    	  <th>
    	    Battery
    	  </th>
    	  <th>
    	    Fuel Cell
    	  </th>
    	  <th>
    	    Charger
    	  </th>
    	  <th>
    	    Sw4
    	  </th>
    	  <th>
    	    Sw5
    	  </th>
        <th>
    	    Sw6
    	  </th>
        <th>
    	    Sw7
    	  </th>
        <th>
    	    Sw8
    	  </th>
    	</tr>
    	<tr>
    	  <td className={this.props.battery}>
    	  </td>
    	  <td className={this.props.fuel_cell}>
    	  </td>
        <td className={this.props.charger}>
    	  </td>
        <td className={this.props.sw4}>
    	  </td>
        <td className={this.props.sw5}>
    	  </td>
        <td className={this.props.sw6}>
    	  </td>
        <td className={this.props.sw7}>
    	  </td>
        <td className={this.props.sw8}>
    	  </td>
    	</tr>
    	</tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td className="switch_tablecell switch_label">
          <span>
    	     Switchboard
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    )
  }
}

export default Switch;
