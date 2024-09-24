import { message } from "antd";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

interface IBase<T = string | null> {
  data: T;
  code: number;
  msg: string;
}

export const BASE_URL = "http://localhost:3000";
const request = axios.create({ baseURL: `${BASE_URL}` });

export function handleErrorType(error: Error) {
  return error as AxiosError<IBase>;
}

// 请求拦截器
request.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token") as string)?.data;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const data = response?.data as IBase;

    if (data.code === 0 && data.msg !== undefined) message.success(data.msg);

    return response;
  },
  (error) => {
    const { response } = handleErrorType(error) || {};
    message.warning(response?.data?.msg ?? "出现未知的错误，请重试");
  }
);

export default async function makeRequest<T>(
  url: string,
  options?: AxiosRequestConfig
) {
  return (
    await request({
      url,
      ...options,
    })
  ).data as IBase<T>;
}
