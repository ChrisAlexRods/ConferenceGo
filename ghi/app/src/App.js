import Nav from './Nav';
import React from 'react';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm.js';

function App(props) {
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        <ConferenceForm/>
      {/* <LocationForm /> */}
        {/* <AttendeesList attendees ={props.attendees} /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
