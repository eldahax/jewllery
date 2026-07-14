import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});


API.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(`Token issue detected (${status}). Attempting automatic silent renewal...`);

      try {
        await axios.post(
          "http://localhost:5000/api/users/refresh",
          {},
          { withCredentials: true }
        ); 
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;