import React from "react";
import "./DataBox.css";
import "./Controller1.css";

export default ({ knob_sb, knob_bb, knob_switch_sb, knob_switch_bb}) => (
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
	    Knob Switch Starboard
	  </th>
	  <th>
	    Knob Switch Backboard
	  </th>
	</tr>
	<tr>
	  <td>
	    {knob_sb}/1024
	  </td>
	  <td>
	    {knob_bb}/1024
	  </td>
	  <td className={knob_switch_sb}>
		 {knob_switch_sb}
	  </td>
	  <td className={knob_switch_bb}>
		 {knob_switch_bb}
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
