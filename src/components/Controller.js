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
   
    componentDidMount(){
      this.setState({
	knob_sb: this.props.knob_sb,
        knob_bb: this.props.knob_bb,
        knob_fw_sb: this.props.knob_fw_sb,
        knob_fw_bb: this.props.knob_fw_bb,
        knob_bw_sb: this.props.knob_bw_sb,
        knob_bw_bb: this.props.knob_bw_bb
      });
    }


    render(){
      return (
        <table border={1} className='widget-body'>
          <tbody>
            <tr className="tableheader tablecell">
              <th colSpan='2'>
                Knob Starboard
              </th>
              <th colSpan='2'>
                Knob Backboard
              </th>
            </tr>
            <tr>
              <td colSpan='2'>
	        <canvas id='knob_sb' style={{marginLeft:0}} width={200}></canvas>
              </td>
              <td colSpan='2'>
                <canvas id='knob_bb' style={{marginLeft:0}} width={200}></canvas>
              </td>
	    </tr>
	    <tr>
              <td className={this.state.knob_fw_sb}>
	        <div style={{height:25}}>Forward</div>
              </td>
              <td className={this.state.knob_bw_sb}>
	        <div style={{height:25}}>Backward</div>
              </td>
              <td className={this.state.knob_fw_bb}>
	        <div style={{height:25}}>Forward</div>
             </td>
             <td className={this.state.knob_bw_bb}>	
	       <div style={{height:25}}>Backward</div>
             </td>
            </tr>
          <tr>
            <td className="tablecell" colSpan='4'>
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
