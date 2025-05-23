import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// ✅ 인터셉터를 이 안에 직접 넣음
const token = localStorage.getItem("accessToken");
console.log("✅ axiosInstance 로드됨, 토큰:", token);
axiosInstance.interceptors.request.use((config) => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
