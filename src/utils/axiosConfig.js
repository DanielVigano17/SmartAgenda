import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://backend-smartstudy.onrender.com/'
  });

  // export const axiosInstance = axios.create({
  //   baseURL: 'http://localhost:3333/'
  // });