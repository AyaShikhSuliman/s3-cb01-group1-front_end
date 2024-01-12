import axios from "axios"
import TokenManager from "./TokenManager"

const AuthAPI = {
    login: async (username, password) => {
        try {
          const response = await axios.post('http://localhost:8080/login', { username, password })
          const token = response.data.accessToken;
          TokenManager.setToken(token);
          return { success: true, data: { token } };
        } catch (error) {
          return { success: false, error: error };
        }
      },
}



export default AuthAPI;