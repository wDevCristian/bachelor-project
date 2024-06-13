import axios from "axios";

const REQ_TIMEOUT = 15000;

const $host = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: REQ_TIMEOUT,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: REQ_TIMEOUT,
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
