import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const EmployeeAPI = {
    getEmployeesByDepName: function (depname) {
        return axios.get(BASE_URL + "employees/department/"+depname);
      },
    searchEmployee: function (input) {
      return axios.get(BASE_URL + "employees/"+input);
    },
    updateEmployee: function(employee){
     return axios.put(BASE_URL + "employees/" + employee.id, {
      id: employee.id,
      name: employee.name,
      departmentId:employee.department.id,
      emailAddress:employee.emailAddress
    }
    )
  },
  delete: function (id) {
    return axios.delete(BASE_URL + "employees/" + id);
  },
}