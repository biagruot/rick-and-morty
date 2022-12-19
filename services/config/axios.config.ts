import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/utils/constants";
import { onSuccess, onError } from "@/services/config/requestHandler";

const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.get["Accept-Encoding"] = "*";

const request = async ({ ...options }: AxiosRequestConfig) => {
  return axiosInstance(options).then(onSuccess).catch(onError);
};

export default request;
