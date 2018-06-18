import React, { Component } from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/PduController.css";

class PduController extends Component{

  constructor(props){
    super(props);
    this.state = {
      current_sb: props.current_sb,
      current_bb: props.current_bb,
      v12_bus: props.v12_bus,
      v12_battery: props.v12_batter,
      v48_bus: props.v48_bus,
      v48_dcdc: props.v48_dcdc
    }
  }
 
  render(){
    return(
<table className='pdu_widget-body'>
  <tbody>
  <tr>
    <td className="pdu_tablecell">
      <table border={1}>
	<tbody>
	<tr>
	  <th>
	    Current Starboard
	  </th>
	  <th>
	    Current Backboard
	  </th>
	  <th>
	    V12 Bus
	  </th>
	  <th>
	    V12 Battery
	  </th>
	  <th>
	    V48 Bus
	  </th>
	  <th>
	    V48 DCDC
	  </th>
	</tr>
	<tr>
	  <td>
	    {this.state.current_sb}
	  </td>
	  <td>
	    {this.state.current_bb}
	  </td>
	  <td>
	    {this.state.v12_bus}
	  </td>
	  <td>
	    {this.state.v12_battery}
	  </td>
	  <td>
	    {this.state.v48_bus}
	  </td>
	  <td>
	    {this.state.v48_dcdc}
	  </td>
	</tr>
	</tbody>
      </table>
    </td>
  </tr>
  <tr>
    <td className="pdu_tablecell pdu_label">
      <span>
	PDU
      </span>
    </td>
  </tr>
  </tbody>
</table>
);
  }
}
export default PduController;
