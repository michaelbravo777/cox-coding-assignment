import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import ValidationError from '../../ValidationError'

import { editAppointment } from "../../actions/index";
import './Form.css'

function mapDispatchToProps(dispatch) {
  return {
    editAppointment: appointment => dispatch(editAppointment(appointment))
  };
}

Modal.setAppElement(document.getElementById('root'));

// styles for modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.appointment.name,
      modalIsOpen: false,
      isEmpty: true,
      formValid: false,
      nameValid: false,
      phoneValid: false,
      validationMessages: {
        name: '',
        phone: ''
      }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAppointment = this.clearAppointment.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  }

  updateName(name) {
    this.setState({ ...this.state, name }, () => { this.validateName(name) });
  }

  updateAreacode(areaCode) {
    this.setState({ ...this.state, areaCode }, () => { this.validatePhone(areaCode) });
    let prefix = document.getElementById("prefix")
    if (areaCode.length === 3) { prefix.focus() }
  }

  updatePrefix(prefix) {
    this.setState({ ...this.state, prefix }, () => { this.validatePhone(prefix) });
    let line = document.getElementById("line")
    if (prefix.length === 3) { line.focus() }
  }

  updateLine(line) {
    this.setState({ ...this.state, line }, () => { this.validatePhone(line) });
    let submit = document.getElementById("submit")
    if (line.length === 4) { submit.focus() }
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, () => {
      this.validateForm();
    });
  }

  validatePhone(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    let areaCode = (this.state.areaCode ? this.state.areaCode.length : 0);
    let prefix = (this.state.prefix ? this.state.prefix.length : 0);
    let line = (this.state.line ? this.state.line.length : 0);

    let totalDigits = areaCode + prefix + line
    if (totalDigits < 10) {
      fieldErrors.phone = 'Phone Number must be at 10 digits';
      hasError = true;
    } else if (totalDigits > 10) {
      fieldErrors.phone = 'Phone Number must be at 10 digits';
      hasError = true;
    } else {
      fieldErrors.phone = '';
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      phoneValid: !hasError
    }, () => {
      this.validateForm();
    });
  }

  validateForm = () => {
    this.setState({
      formValid: this.state.nameValid && this.state.phoneValid
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, areaCode, prefix, line } = this.state;
    const id = this.props.appointment.id;
    this.props.editAppointment({ id, name, areaCode, prefix, line });
    let phone = "(" + areaCode + ")" + prefix + "-" + line
    this.setState({
      phone,
      isEmpty: false,
      modalIsOpen: false
    });
  }

  clearAppointment(e) {
    e.preventDefault();
    const name = '';
    const areaCode = '';
    const prefix = '';
    const line = '';
    const phone = '';
    const id = this.props.appointment.id;
    this.props.editAppointment({ id, name, areaCode, prefix, line });
    this.setState({
      name,
      phone,
      areaCode,
      prefix,
      line,
      isEmpty: true,
      modalIsOpen: false
    });
  }

  render() {
    // let phone = ""
    // if (this.state.areaCode) {
    //   phone = "(" + this.props.appointment.areaCode + ")" + this.props.appointment.prefix + "-" + this.props.appointment.line
    // }
    return (
      <div>
        <div className={this.state.isEmpty ? "row" : 'row red'} onClick={this.openModal}>
          <div className="cell center">{this.props.appointment.timeSlot}</div>
          <div className="cell">{this.props.appointment.name}</div>
          <div className="cell">{this.state.phone}</div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="center">
            <h2>Enter Name and Phone Number</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                Time Slot: {this.props.appointment.timeSlot}
                <br />
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={this.state.name}
                  onChange={e => this.updateName(e.target.value)}
                  className="name"
                />
                <label htmlFor="phone">Phone</label>
                {' '}(<input
                  type="number"
                  id="areaCode"
                  defaultValue={this.state.areaCode}
                  onChange={e => this.updateAreacode(e.target.value)}
                  className="areaCode"
                  maxlength="3"
                  pattern="\d{3}"
                />)
                <input
                  type="number"
                  id="prefix"
                  defaultValue={this.state.prefix}
                  onChange={e => this.updatePrefix(e.target.value)}
                  className="prefix"
                  maxlength="3"
                  pattern="\d{3}"
                />
                -
                <input
                  type="number"
                  id="line"
                  defaultValue={this.state.line}
                  onChange={e => this.updateLine(e.target.value)}
                  className="line"
                />
                <br />
                {/* only enable submit button if form is valid */}
                <button id="submit" disabled={!this.state.formValid} type="submit">Save</button>
                <button onClick={this.closeModal}>Exit</button>
                <button onClick={this.clearAppointment}>Clear</button>
              </div>
            </form>
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
            <ValidationError hasError={!this.state.phoneValid} message={this.state.validationMessages.phone} />
          </div>
        </Modal>
      </div>
    );
  }
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;