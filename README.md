# Humphry Dashboard


## Introduction

##### Backend: Node-Express and Websockets
##### Frontend: React

This is the repository for the Humphry Engine Dashboard.  This tool is a central application to monitor the sensors and motor for the Humphry engine prototype.  The dashboard runs a local server to which arduino controllers post incremental updates from the engine.  If necessary, these updates can also be saved to a Mysql database.  The user-facing client must be run and viewed locally as well.


## Installation and dependencies
You should already have git and npm

- Clone the repository
- `npm install`

## Starting backend
Right now the backend supports a REST api and websocket connection.  The silly part is that the websocket implementation is built on right top of the REST implementation.  Incoming ws messages just send a post request. You can attach either of these to a service file to run them on device.
- Running REST server *required*
  - `node server/server.js`
  - once the server is running, send requests to http://<address>:5000
- Running websocket listener *optional*
  - requires REST server to be running as well
  - `node server/sockets.js`
  - once socket listener is running, send websocket messages to ws://<address>:5001

## Start Client Frontend
- navigate to dashboard-gui and run `npm start`
  - `npm run build` for production
- <b>to view the GUI, point your browser http://<address>:4350</b>


## API Reference
<table>
	<tr>
    <th> Component </th>
    <th> Endpoint </th>
    <th> Update Parameters </th>
    </tr>
    <tr>
    <td> Controller </td>
    <td> /api/data/controller </td>
    <td>
    <table>
    <tr>
    <th>Name</th><th>Type</th><th>Values</th><th>Description</th>
    </tr>
    <tr>
    <th>knob_sb</th>
    <td>Signed integer</td>
    <td>-1024...1024</td>
    <td>Percentage of the starboard throttle</td>
    </tr>
    <tr>
    <th>knob_bb</th>
    <td>Signed integer</td>
    <td>-1024...1024</td>
    <td>Percentage of the backboard throttle</td>
    </tr>
	<tr>
    <th>knob_sb_fw</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>Forward state of starboard motor</td>
    </tr>
    </table>
    </td>
    <tr>
    <td>Backboard motor</td>
    <td>/api/data/motorbb</td>
    <td>
    <table>
    <tr>
    <th>Name</th><th>Type</th><th>Values</th><th>Description</th>
    </tr>
    <tr>
    <th>rpm</th>
    <td>Unsigned integer</td>
    <td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Rotations per minute of backboard motor</td>
    </tr>
    <tr>
    <th>motor_temp</th>
    <td>Unsigned integer</td>
	<td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Temperature of the backboard motor</td>
    </tr>
	<tr>
    <th>coolant_temp</th>
    <td>Unsigned integer</td>
	<td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Temperature of the backboard coolant</td>
    </tr>
   	<tr>
    <th>elock</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of elock</td>
    </tr>
    <tr>
    <th>pump</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of pump</td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>Starboard motor</td>
    <td>/api/data/motorbb</td>
    <td>
    <table>
    <tr>
    <th>Name</th><th>Type</th><th>Values</th><th>Description</th>
    </tr>
    <tr>
    <th>rpm</th>
    <td>Unsigned integer</td>
    <td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Rotations per minute of backboard motor</td>
    </tr>
    <tr>
    <th>motor_temp</th>
    <td>Unsigned integer</td>
	<td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Temperature of the backboard motor</td>
    </tr>
	<tr>
    <th>coolant_temp</th>
    <td>Unsigned integer</td>
	<td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Temperature of the backboard coolant</td>
    </tr>
   	<tr>
    <th>elock</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of elock</td>
    </tr>
    <tr>
    <th>pump</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of pump</td>
    </tr>
    </table>
    </td>
    <tr>
    <td>
    Power Distribution Unit
    </td>
    <td>
    /api/data/pdu
    </td>
    <td>
    <table>
    <tr>
    <th>Name</th><th>Type</th><th>Values</th><th>Description</th>
    </tr>
    <tr>
    <th>current_sb</th>
    <td>Unsigned integer</td>
    <td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Current diverted to the starboard motor (mA)</td>
    </tr>
    <tr>
    <th>current_bb</th>
    <td>Unsigned integer</td>
    <td><img src='https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;' alt='Any positive integer'></td>
    <td>Current diverted to the backboard motor (mA)</td>
    </tr>
	<tr>
    <th>v12_bus</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off Status of the 12 volt databus</td>
    </tr>
   	<tr>
    <th>v12_battery</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of the 12 volt battery</td>
    </tr>
    <tr>
    <th>v48_bus</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of the 48 volt databus</td>
    </tr>
   	<tr>
    <th>v48_dcdc</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off status of 48 volt DC-DC converter</td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    Switchboard
    </td>
    <td>
    /api/data/switch
    </td>
    <td>
    <table>
    <tr>
    <th>Name</th><th>Type</th><th>Values</th><th>Description</th>
    </tr>
    <tr>
    <th>battery</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch</td>
    </tr>
    <tr>
    <th>fuel_cell</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch</td>
    </tr>
	<tr>
    <th>charger</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch</td>
    </tr>
   	<tr>
    <th>sw4</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch placeholder</td>
    </tr>
    <tr>
    <th>sw5</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch placeholder</td>
    </tr>
    <tr>
    <th>sw6</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch placeholder</td>
    </tr>
    <tr>
    <th>sw7</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch placeholder</td>
    </tr>
    <tr>
    <th>sw8</th>
    <td>Boolean</td>
    <td>{0,1}</td>
    <td>On/Off switch placeholder</td>
    </tr>
    </table>
    </td>
    </tr>
</table>

##### Example Call:
Update controller:
* POST http://192.168.178.152:5000/api/data/controller
* Headers: {"Content-Type": "application/json"}
* Body: {"knob_sb":400,"knob_bb":549, "knob_sb_fw":0, "knob_sb_bw":1, "knob_bb_fw":0, "knob_bb_bw":1}


## Creating new component
To create a new component
* Copy one of the existing component JS file in src/components/
	* `cp src/components/Controller.js src/components/<NewComponent>.js`
* And its accompanying CSS file in src/stylesheets/
	* `cp src/stylesheets/Controller.css src/stylesheets/<NewComponent>.css`
* Edit the imports in the heading of \<NewComponent\>.js to link the appropriate stylesheet
	* `import "../stylesheets/<NewComponent>.js`
* For each new update parameter, add \<table\> rows and data following the structure of the old component, but with the new parameters
* Import the new component in App.js
	* `import <NewComponent> from "./components/<NewComponent>";`
* Instantiate the new component as an HTML element with the update parameters as its arguments \<NewComponent\>
	* For further information on how to update the new component in React, read the React documentation or refer <a href=https://stackoverflow.com/questions/40974240/passing-data-to-child-components-in-reactjs>here</a>.

* In the `componentDidMount` function in App.js, add a new socket listener like the others
	* ```javascript
  	  socket.on("<NewComponent>", data => {
      data = JSON.parse(data);
      this.setState({
        updateParameter1: data.updateParameter1,
        updateParameter2: data.updateParameter2
        });
      });
    	```
## Pushing changes
Changes to the UI are not a problem, React will automatically render changes or throw an error page.

Changes to the server (server/server.js) file, however, do <b>require you to restart the server</b>.

#### Restarting the server
----
In this order and from any directory, type the commands:
* `sudo systemctl disable humphry-dashboard-server`
* `sudo systemctl disable humphry-dashboard-websockets`
* `sudo systemctl daemon-reload`
* `sudo systemctl enable humphry-dashboard-server`
* `sudo systemctl enable humphry-dashboard-websockets`
  * enabling the service should start the server again
  * if not, then run `sudo systemctl start humphry-dashboard-server`
  * `sudo systemctl start humphry-dashboard-websockets`
