import { $authHost, $host } from "./index.js";
import { jwtDecode } from "jwt-decode";

export async function register(firstname, lastname, email, password) {
  const { data } = await $host.post("/api/user/register", {
    firstname,
    lastname,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}

export async function login(email, password) {
  const { data } = await $host.post("/api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}

export async function check() {
  const { data } = await $authHost.get("/api/user/check", {});
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
}
