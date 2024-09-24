import makeRequest from "../utils/request";

// 登录接口
export async function login(data: { username: string; password: string }) {
  return makeRequest<string>("/user/login", {
    data,
    method: "POST",
  });
}

// 注册接口
export async function register(data: { username: string; password: string }) {
  return makeRequest<string>("/user/register", {
    data,
    method: "POST",
  });
}

