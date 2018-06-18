import React from "react";
import "../stylesheets/DataBox.css";

export default ({ label, data }) => (
<table class='widget-body'>
  <tr>
    <td class="tablecell">
      <div class="content">
	{data}
      </div>
    </td>
  </tr>
  <tr>
    <td class="tablecell label">
      <span>
	{label} 
      </span>
    </td>
  </tr>
</table>
);
