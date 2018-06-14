import React from "react";
import "./DataBox.css";
import "./Controller.css";


export default ({ knob_sb, knob_bb, knob_fw_sb, knob_fw_bb, knob_bw_sb, knob_bw_bb}) => (
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
	    {knob_sb}
	  </td>
	  <td>
	    {knob_bb}
	  </td>
	  <td class={knob_fw_sb}>
	  </td>
	  <td class={knob_bw_sb}>
	  </td>
	  <td class={knob_fw_bb}>
	  </td>
	  <td class={knob_bw_bb}>
	  </td>
	</tr>
	</tbody>
      </table>
    </td>
  </tr>
  <tr>
    <td className="tablecell label">
      <span>
	Controller 1 
      </span>
    </td>
  </tr>
  </tbody>
</table>
);
