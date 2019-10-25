import { EDIT_APPOINTMENT } from "../constants/action-types";

export function editAppointment(payload) {
  return { type: EDIT_APPOINTMENT, payload };
}
