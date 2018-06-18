import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{

  constructor(props){
    super(props);
    this.state = {
      chartData:{
        labels:['Bostons', 'Worcester'],
	datasets:[
	  {
	    label:'Population',
	    data:[5,10],
	    backgroundColor:[
		    'red','black'
	    ]
   	  }
	]
      }
    };
  }


  render(){
    return (
      <div className='chart'>
	    <Bar
	      data={this.state.chartData}
	    />
      </div>
    )
  }
}

export default Chart;
