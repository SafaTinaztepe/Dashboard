import React from "react";
import "./DataBox.css";

export default ({ data }) => (
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
        Motor 
      </span>
    </td>
  </tr>
</table>
);
