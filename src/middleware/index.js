import { EDIT_APPOINTMENT } from "../constants/action-types";

export function checkAppointmentMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === EDIT_APPOINTMENT) {
        // if (action.payload.name.length === 0) {
        //   return dispatch({ type: "Name required" });
        // }
      }
      return next(action);
    };
  };
}
