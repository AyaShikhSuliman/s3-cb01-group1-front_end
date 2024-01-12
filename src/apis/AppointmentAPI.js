import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const AppointmentAPI = {
  get: function (empId) {

    return axios.get(BASE_URL + "appointments/employee/"+ empId);
  },
  getAllAppointmentsByEmpIdAndDate: function (date,empId) {

    return axios.get(BASE_URL + `appointments/employee/empIdAndDate?date=${date}&empId=${empId}`);
  },
  getAllAppointmentsByGuestName: function (name) {
    return axios.get(BASE_URL + "appointments/guest/"+name);
  },
  getAllAppointmentsByLicense: function (License) {
    return axios.get(BASE_URL + "appointments/license/"+License);
  },

  getAllByDates: function (startDate,endDate) {
    return axios.get(BASE_URL+`appointments/date?startDate=${startDate}&endDate=${endDate}`);
  },
  delete: function (id) {
    return axios.delete(BASE_URL + "appointments/" + id);
  },

  create: async function (props) {
    console.log("response creare")
    try {
      const response = await axios
        .post(BASE_URL + "appointments/", {
          startTime: props.startTime,
          endTime: props.endTime,
          date: props.date,
          employeeId: props.employeeId,
          guestName: props.guestName,
          email: props.guestEmail,
          licensePlate: props.guestLicense,
        });
      console.log(response);
    } catch (error) {
      console.log("error",error);
    }
  },

  update: async function (appointment) {
    console.log("appointment update from api",appointment)
    try {
      const response = await axios
        .put(BASE_URL + "appointments/" + appointment.id, {
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          date: appointment.date,
          employeeId: appointment.employee.id,
          guestId: appointment.guestId,
          guestName: appointment.guestName,
          email: appointment.guestEmail,
          licensePlate: appointment.guestLicense,
        });
      console.log("response update",response);
    } catch (error) {
      console.log("error",error);
    }
  },

  // ...
};
