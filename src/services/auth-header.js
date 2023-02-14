import axios from "axios";
import store from "@/store";
import router from "@/router";

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // return { Authorization: "Bearer " + user.accessToken }; // for Spring Boot back-end
    return {
      "x-access-token": user.accessToken,
      "Content-Type": "multipart/form-data",
    }; // for Node.js Express back-end
  } else {
    return {};
  }
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch("auth/logout");
      router.push("/");
    }
    return Promise.reject(error);
  }
);
