import React from "react";
import AppointmentList from "../AppointmentList/AppointmentList";
import './App.css'

const App = () => (
  <>
    <header className="App-header">
      <h1 className="App-title">Cox Coding Assignment</h1>
    </header>
    <div className="App center">
      <h2>Appointments</h2>
      <AppointmentList />
      <h3>Click on a time slot to edit</h3>
    </div>
  </>
);

export default App;