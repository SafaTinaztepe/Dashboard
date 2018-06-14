import React from "react";
import "./DataBox.css";
import "./PduController.css";


export default ({ current_sb, current_bb, v12_bus, v12_battery, v48_bus, v48_dcdc}) => (
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
	    {current_sb}
	  </td>
	  <td>
	    {current_bb}
	  </td>
	  <td> 
	    {v12_bus}
	  </td>
	  <td>
	    {v12_battery}
	  </td>
	  <td>
	    {v48_bus}
	  </td>
	  <td>
	    {v48_dcdc}
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
