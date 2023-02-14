import axios from "axios";
import store from "@/store";
import authHeader from "@/services/auth-header";
import { websiteURL } from "@/utils";

const API_URL = websiteURL + "api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log("Inside Login");
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  forgotpassword(data) {
    console.log("Forgot Password " + API_URL + "forgotpassword");
    console.log(data);
    return axios.post(API_URL + "forgotpassword", {
      email: data.email,
    });
  }

  resetpassword(data) {
    console.log("Reset Password " + API_URL + "resetpassword");

    return axios.post(API_URL + "resetpassword", {
      password: data.password,
      token: data.token,
    });
  }

  register(user) {
    console.log("Trying To Register " + API_URL + "signup");
    let userRoles = [];
    userRoles.push(user.roles);

    return axios.post(API_URL + "signup", {
      email: user.email,
      password: user.password,
      title: user.title,
      gender: user.gender,
      ethnicity: user.ethnicity,
      firstName: user.firstName,
      lastName: user.lastName,
      nameOrg: user.nameOrg,
      roles: userRoles,
    });
  }

  saveProfile(profileData) {
    console.log("Trying To Save Profile " + API_URL + "user/profile");
    console.log("UserId " + store.state.auth.user.id);
    return axios.post(
      API_URL + "user/profile",
      {
        city: profileData.city,
        state: profileData.state,
        department: profileData.department,
        physicalDis: JSON.stringify(profileData.physicalDis),
        ageRange: profileData.ageRange,
        insType: profileData.insType,
        userId: store.state.auth.user.id,
      },
      { headers: authHeader() }
    );
  }

  saveIndProfile(profileData) {
    console.log("Trying To Save Profile " + API_URL + "user/ind/profile");
    console.log("UserId " + store.state.auth.user.id);
    return axios.post(
      API_URL + "user/ind/profile",
      {
        ageRange: profileData.ageRange,
        department: profileData.department,
        ethnicDiv: profileData.ethnicDiv,
        expertise: profileData.expertise,
        genderDiv: profileData.genderDiv,
        levelEducation: profileData.levelEducation,
        location: profileData.location,
        organPolicy: profileData.organPolicy,
        physicalDis: JSON.stringify(profileData.physicalDis),
        position: profileData.position,
        size: profileData.size,
        type: profileData.type,
        website: profileData.website,
        yearsOfExp: profileData.yearsOfExp,
        userId: store.state.auth.user.id,
      },
      { headers: authHeader() }
    );
  }
}

export default new AuthService();
