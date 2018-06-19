import React, { Component} from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/Controller.css";

class Controller extends Component{

    constructor(props){
      super(props);
      this.state = {
        knob_sb: props.knob_sb,
        knob_bb: props.knob_bb,
        knob_fw_sb: props.knob_fw_sb,
        knob_fw_bb: props.knob_fw_bb,
        knob_bw_sb: props.knob_bw_sb,
        knob_bw_bb: props.knob_bw_bb
      }
    }

    render(){
      return (
        <table border={1} className='widget-body'>
          <tbody>
          <tr>
            <td className="tablecell">
        	<tr className="tableheader">
        	  <th colspan='2'>
        	    Knob Starboard
        	  </th>
        	  <th colspan='2'>
        	    Knob Backboard
        	  </th>
        	</tr>
        	<tr>
        	  <td colspan='2'>
	      	    <canvas id='knob_sb' style={{marginLeft:0}} width={200}></canvas>
        	  </td>
        	  <td colspan='2'>
        	    <canvas id='knob_bb' style={{marginLeft:0}} width={200}></canvas>
        	  </td>
	        </tr>
	        <tr>
        	      <td className={this.props.knob_fw_sb}>
	      	 	<div style={{height:25}}>Forward</div>
        	      </td>
                      <td className={this.props.knob_bw_sb}>
	      	 	<div style={{height:25}}>Backward</div>
        	      </td>
        	      <td className={this.props.knob_fw_bb}>
	      	 	<div style={{height:25}}>Forward</div>
        	      </td>
        	      <td className={this.props.knob_bw_bb}>	
	      	 	<div style={{height:25}}>Backward</div>
        	      </td>
        	</tr>
              </td>
            </tr>
            <tr>
              <td className="tablecell" colspan='4'>
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
export default Controller;
