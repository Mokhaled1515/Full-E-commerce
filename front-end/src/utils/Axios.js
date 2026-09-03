import axios from "axios";
import SummaryApi, { baseURL } from "../components/Common/SummerCommon";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});






Axios.interceptors.request.use(
  async (config) => {
    const accesToken = localStorage.getItem("accesstoken");
    if (accesToken) {
      config.headers.Authorization = `Bearer ${accesToken}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let orginRequest = error.config;

    if (error.response.status === 401 && !orginRequest.retry) {
      orginRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      // refreshToken gded

      // refreshTooken qdeem

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          orginRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(orginRequest);
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error)
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accesToken = response.data.data.accesstoken;
    localStorage.getItem("accesstoken", accesToken);
    return accesToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
