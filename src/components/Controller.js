import React, { Component} from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/Controller.css";

class Controller extends Component{

    constructor(props){
      super(props);
      this.state = {
        knob_sb: this.props.knob_sb,
        knob_bb: this.props.knob_bb,
        knob_fw_sb: this.props.knob_fw_sb,
        knob_fw_bb: this.props.knob_fw_bb,
        knob_bw_sb: this.props.knob_bw_sb,
        knob_bw_bb: this.props.knob_bw_bb
      }
    }

    render(){
      return (
        <table className='widget-body'>
          <tbody>
          <tr>
            <td className="tablecell">
              <table border={1}>
        	<tbody>
        	<tr>
        	  <th>
        	    Knob Starboard
        	  </th>
        	  <th>
        	    Knob Backboard
        	  </th>
        	  <th>
        	    Knob Forward Switch Starboard
        	  </th>
        	  <th>
        	    Knob Backward Switch Starboard
        	  </th>
        	  <th>
        	    Knob Forward Switch Backboard
        	  </th>
        	  <th>
        	    Knob Backward Switch Backboard
        	  </th>
        	</tr>
        	<tr>
        	  <td>
        	    {this.state.knob_sb}
        	  </td>
        	  <td>
        	    {this.state.knob_bb}
        	  </td>
        	  <td class={this.state.knob_fw_sb}>
        	  </td>
        	  <td class={this.state.knob_bw_sb}>
        	  </td>
        	  <td class={this.state.knob_fw_bb}>
        	  </td>
        	  <td class={this.state.knob_bw_bb}>
        	  </td>
        	</tr>
        	</tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="tablecell label">
              <span>
        	Controller
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      )
    }
}
