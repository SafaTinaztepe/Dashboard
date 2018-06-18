import React from "react";
import "../stylesheets/DataBox.css";
import "../stylesheets/MotorSb.css";


export default ({ rpm, motor_temp, coolant_temp, elock, pump}) => (
<table className='motor_widget-body'>
  <tbody>
  <tr>
    <td className="motor_tablecell">
      <table border={1}>
	<tbody>
	<tr>
	  <th>
	    Rotations Per Minute
	  </th>
	  <th>
	    Motor Temperature (C)
	  </th>
	  <th>
	    Coolant Temperature (C)
	  </th>
	  <th>
	    E Lock 
	  </th>
	  <th>
	    Pump 
	  </th>
	</tr>
	<tr>
	  <td>
	    {rpm}
	  </td>
	  <td>
  	    {motor_temp}
	  </td>
	  <td> 
	    {coolant_temp}
	  </td>
	  <td class={elock}>
	  </td>
	  <td class={pump}>
	  </td>
	</tr>
	</tbody>
      </table>
    </td>
  </tr>
  <tr>
    <td className="motor_tablecell motor_label">
      <span>
	MotorSb 
      </span>
    </td>
  </tr>
  </tbody>
</table>
);
