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
- Running websocket listener *optional*
  - `node server/sockets.js`

## Start Client Frontend
- navigate to dashboard-gui and run `npm start`
  - `npm run build` for production


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
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>bit</td>
    <td>0 1</td>
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
    <td>![Any positive Integer](https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;)</td>
    <td>Rotations per minute of backboard motor</td>
    </tr>
    <tr>
    <th>motor_temp</th>
    <td>unsigned integer</td>
    <td>![Any positive Integer](https://latex.codecogs.com/gif.latex?%5Cmathbb%7BZ%7D%5E&plus;)</td>
    <td>Percentage of the backboard throttle</td>
    </tr>
	<tr>
    <th>knob_sb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
	<td>
    Starboard Motor
    </td>
    <td>
    /api/data/motorsb
    </td>
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
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
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
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
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
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_sb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
    <tr>
    <th>knob_bb_fw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
    </tr>
   	<tr>
    <th>knob_bb_bw</th>
    <td>bit</td>
    <td>0 1</td>
    <td>Forward state of starboard motor</td>
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
