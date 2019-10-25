import { EDIT_APPOINTMENT } from "../constants/action-types";

const initialState = {
  appointments: []
};

// initialize appointments array with only time slots before copying into state
const timeSlots = ['9AM - 10AM', '10AM - 11AM', '11AM - 12PM', '12PM - 1PM', '1PM - 2PM', '3PM - 4PM', '4PM - 5PM',]
for (let i = 0; i < 7; i++) {
  initialState.appointments.push({ id: i, timeSlot: timeSlots[i] })
}

function rootReducer(state = initialState, action) {
  if (action.type === EDIT_APPOINTMENT) {
    // update the appointment by ID
    return {
      ...state,
      appointments: state.appointments.map(
        (appointment, i) => i === action.payload.id ? {
          ...appointment,
          name: action.payload.name,
          areaCode: action.payload.areaCode,
          prefix: action.payload.prefix,
          line: action.payload.line
        }
          : appointment
      )
    }
  }
  return state;
}

export default rootReducer;
