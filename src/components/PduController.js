import React, { Component } from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/PduController.css";

class PduController extends Component{

  constructor(props){
    super(props);
    this.state = {
      current_sb: this.props.current_sb,
      current_bb: this.props.current_bb,
      v12_bus: this.props.v12_bus,
      v12_battery: this.props.v12_batter,
      v48_bus: this.props.v48_bus,
      v48_dcdc: this.props.v48_dcdc
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){

      this.setState({
        current_sb: this.props.current_sb,
        current_bb: this.props.current_bb,
        v12_bus: this.props.v12_bus,
        v12_battery: this.props.v12_batter,
        v48_bus: this.props.v48_bus,
        v48_dcdc: this.props.v48_dcdc
      });
    }
  }

  render(){
    return(
<table className='pdu_widget-body'>
  <tbody className='pdu_widget-body'>
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
	    {this.props.current_sb}
	  </td>
	  <td>
	    {this.props.current_bb}
	  </td>
	  <td>
	    {this.props.v12_bus}
	  </td>
	  <td>
	    {this.props.v12_battery}
	  </td>
	  <td>
	    {this.props.v48_bus}
	  </td>
	  <td>
	    {this.props.v48_dcdc}
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
