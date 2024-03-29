import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store from "../../store/index";
import AppointmentList from './AppointmentList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}><AppointmentList /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div)
})
