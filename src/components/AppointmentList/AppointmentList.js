import React from "react";
import { connect } from "react-redux";
import Form from "../Form/Form";

const mapStateToProps = state => {
  return { appointments: state.appointments };
};

const ConnectedList = ({ appointments }) => (
  <div className="table">
    <div>
      <div className="head center">Time Slot</div>
      <div className="head center">Name</div>
      <div className="head center">Phone Number</div>
    </div>
    {appointments.map(appointment => (
      <Form
        key={appointment.id}
        appointment={appointment}
      />
    ))}
  </div>

);

const AppointmentList = connect(mapStateToProps)(ConnectedList);

export default AppointmentList;