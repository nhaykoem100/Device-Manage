import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  // baseURL: "https://devicemanagerapp.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  //Handle token here
  const acctoken = localStorage.getItem("token");
  if (acctoken) {
    config.headers.Authorization = `Bearer ${acctoken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    //Handle errors
    throw error;
  }
);

export default axiosClient;
