import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export const DepartmentAPI = {
    getAllDep: function () {
        return axios.get(BASE_URL + "departments/");
      },
}