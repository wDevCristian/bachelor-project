import { $authHost, $host } from "./index.js";
import { jwtDecode } from "jwt-decode";

const EVENT_API_URL = "/api/user";

export async function register(firstname, lastname, email, password) {
  const { data } = await $host.post(`${EVENT_API_URL}/register`, {
    firstname,
    lastname,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}

export async function login(email, password) {
  const { data } = await $host.post(`${EVENT_API_URL}/login`, {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}

export async function check() {
  const { data } = await $authHost.get(`${EVENT_API_URL}/auth`, {});
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}
