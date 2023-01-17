import Nav from './Nav';
import React from 'react';

function App(props) {
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
            </tr>
          </thead>
          <tbody>
          {props.attendees && props.attendees.map(attendee => {
            return (
              <tr key={attendee.href}>
                <td>{ attendee.name }</td>
                <td>{ attendee.conference }</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default App;
