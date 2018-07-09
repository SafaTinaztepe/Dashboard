import React, { Component} from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/Controller.css";

class Controller extends Component{

    constructor(props){
      super(props);
      this.state = {
        knob_sb: this.props.knob_sb,
        knob_bb: this.props.knob_bb,
        knob_sb_fw: this.props.knob_sb_fw,
        knob_bb_fw: this.props.knob_bb_fw,
        knob_sb_bw: this.props.knob_sb_bw,
        knob_bb_bw: this.props.knob_bb_bw,
        slideInputHandler : this.props.slideInputHandler,
        textInputHandler  : this.props.textInputHandler
      };
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps !== this.props){
        this.setState({
          knob_sb: this.props.knob_sb,
          knob_bb: this.props.knob_bb,
          knob_sb_fw: this.props.knob_sb_fw,
          knob_bb_fw: this.props.knob_bb_fw,
          knob_sb_bw: this.props.knob_sb_bw,
          knob_bb_bw: this.props.knob_bb_bw,
          slideInputHandler : this.props.slideInputHandler,
          textInputHandler  : this.props.textInputHandler
        });
      }
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
	               <canvas id='knob_sb_chart' style={{marginLeft:0}} width={200}></canvas>
              </td>
              <td colSpan='2'>
                <canvas id='knob_bb_chart' style={{marginLeft:0}} width={200}></canvas>
              </td>
      	    </tr>
      	    <tr>
              <td className={this.props.knob_sb_fw}>
	              <div style={{height:25}}>Forward</div>
              </td>
              <td className={this.props.knob_sb_bw}>
	              <div style={{height:25}}>Backward</div>
              </td>
              <td className={this.props.knob_bb_fw}>
	              <div style={{height:25}}>Forward</div>
             </td>
             <td className={this.props.knob_bb_bw}>
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
          <tr>
            <td className="tableCell slidecontainer" colSpan='4'>
              KnobSb: <input onKeyDown={this.props.textInputHandler} type='text' size={4} maxLength={4} id='knob_sb_input' name='knob_sb' defaultValue={0}/>
              <input onChange={this.props.slideInputHandler} type="range" min="-1024" max="1024" defaultValue={0} className="slider" name='knob_sb' id='knob_sb_slider'/>
            </td>
          </tr>
          <tr>
            <td className="tableCell slidecontainer" colSpan='4'>
              KnobBb: <input onKeyDown={this.props.textInputHandler} type='text' size={4} maxLength={4} id='knob_bb_input' name='knob_bb' defaultValue={0}/>
              <input onChange={this.props.slideInputHandler} type="range" min="-1024" max="1024" defaultValue={0} className="slider" name='knob_bb' id='knob_bb_slider'/>
            </td>
          </tr>
          </tbody>
        </table>
      )
    }
}
export default Controller;
