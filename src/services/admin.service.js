import axios from "axios";
import authHeader from "./auth-header";
import store from "@/store";
import { auth } from "@/store/auth.module";
import { websiteURL } from "@/utils";

const API_URL = websiteURL + "api/admin/";

class AdminService {
  getUsers() {
    console.log(API_URL + "users");
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  getInstructors() {
    console.log(API_URL + "instructors");
    return axios.get(API_URL + "instructors", { headers: authHeader() });
  }

  getCourseRequests() {
    console.log(API_URL + "courses");
    return axios.get(API_URL + "courses", { headers: authHeader() });
  }

  getIndustryPractitioners() {
    console.log(API_URL + "practitioners");
    return axios.get(API_URL + "practitioners", { headers: authHeader() });
  }

  getAvailability() {
    console.log(API_URL + "availability");
    return axios.get(API_URL + "availability", { headers: authHeader() });
  }

  getUploads() {
    console.log(API_URL + "uploads");
    return axios.get(API_URL + "uploads", { headers: authHeader() });
  }
}

export default new AdminService();
