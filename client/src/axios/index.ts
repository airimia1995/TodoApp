import axios, { AxiosInstance } from "axios";
import { JWT } from "next-auth/jwt";


const axiosInstance = (token: JWT | null) => {
  const headers: any = token ? { authorization: token } : {};
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    headers,
  });

  return instance;
}

export default axiosInstance;
