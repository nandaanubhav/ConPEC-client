import axios from "axios";
import authHeader from "./auth-header";
import store from "@/store";
import { websiteURL } from "@/utils";

const API_URL = websiteURL + "api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getInstructorBoard() {
    console.log(API_URL + "user/course");
    return axios.get(API_URL + "user/course", { headers: authHeader() });
  }

  getNotifications() {
    console.log(API_URL + "user/notifications");
    return axios.get(API_URL + "user/notifications", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  saveCourseRequest(courseData) {
    console.log("Trying To Save Profile " + API_URL + "user/course");
    console.log("UserId " + store.state.auth.user.id);

    if (!store.state.user.course) {
      console.log("Resource does not exit, creating new");
      return axios.post(
        API_URL + "user/course",
        {
          academicLevel: courseData.academicLevel,
          ageRange: courseData.ageRange,
          areaOfExpertise: courseData.areaOfExpertise,
          classSize: courseData.classSize,
          countryStudy: courseData.countryStudy,
          courseRequestType: courseData.courseRequestType,
          date: courseData.date,
          duration: courseData.duration,
          ethnicDiv: courseData.ethnicDiv,
          ethnicity: courseData.ethnicity,
          gender: courseData.gender,
          genderProp: courseData.genderProp,
          indusSupportSize: courseData.indusSupportSize,
          learning: courseData.learning,
          levelEducation: courseData.levelEducation,
          needForPreVisit: courseData.needForPreVisit,
          noOfFreq: courseData.noOfFreq,
          physicalDis: JSON.stringify(courseData.physicalDis),
          physicalDisConcern: JSON.stringify(courseData.physicalDisConcern),
          siteOffice: courseData.siteOffice,
          studentDept: courseData.studentDept,
          time: JSON.stringify(courseData.time),
          topic: courseData.topic,
          visualRep: courseData.visualRep,
          yearsOfExp: courseData.yearsOfExp,
          insDeliveryType: courseData.insDeliveryType,
          Phone: courseData.Phone,
          phoneNumber: courseData.phoneNumber,
          userId: store.state.auth.user.id,
        },
        { headers: authHeader() }
      );
    } else {
      console.log("Resource exits, updating");
      return axios.put(
        API_URL + "user/course",
        {
          academicLevel: courseData.academicLevel,
          ageRange: courseData.ageRange,
          areaOfExpertise: courseData.areaOfExpertise,
          classSize: courseData.classSize,
          countryStudy: courseData.countryStudy,
          courseRequestType: courseData.courseRequestType,
          date: courseData.date,
          duration: courseData.duration,
          ethnicDiv: courseData.ethnicDiv,
          ethnicity: courseData.ethnicity,
          gender: courseData.gender,
          genderProp: courseData.genderProp,
          indusSupportSize: courseData.indusSupportSize,
          learning: courseData.learning,
          levelEducation: courseData.levelEducation,
          needForPreVisit: courseData.needForPreVisit,
          noOfFreq: courseData.noOfFreq,
          physicalDis: JSON.stringify(courseData.physicalDis),
          physicalDisConcern: JSON.stringify(courseData.physicalDisConcern),
          siteOffice: courseData.siteOffice,
          studentDept: courseData.studentDept,
          time: JSON.stringify(courseData.time),
          topic: courseData.topic,
          visualRep: courseData.visualRep,
          yearsOfExp: courseData.yearsOfExp,
          userId: store.state.auth.user.id,
          insDeliveryType: courseData.insDeliveryType,
          Phone: courseData.Phone,
          phoneNumber: courseData.phoneNumber,

          id: store.state.user.course.id,
        },
        { headers: authHeader() }
      );
    }
  }

  deleteCourseRequest(courseData) {
    console.log("Trying To Delete Course " + API_URL + "user/course");
    console.log("UserId " + store.state.auth.user.id);
    return axios.delete(API_URL + "user/course/" + courseData.id, {
      headers: authHeader(),
    });
  }

  getRecommendations(courseData) {
    console.log(
      "Trying To View Recommendations for Course " +
        API_URL +
        "user/course/" +
        courseData.id +
        "/recommendations"
    );
    return axios.get(
      API_URL + "user/course/" + courseData.id + "/recommendations",
      {
        headers: authHeader(),
      }
    );
  }

  getIndustryPractitionerProfile(industryPractitionerUserId) {
    console.log(
      "Trying To View Profile for Course " +
        API_URL +
        "user/profile/" +
        industryPractitionerUserId
    );
    return axios.get(API_URL + "user/profile/" + industryPractitionerUserId, {
      headers: authHeader(),
    });
  }

  saveAvailability(data) {
    console.log("Trying To Save Availability " + API_URL + "user/availability");
    console.log("UserId " + store.state.auth.user.id);
    return axios.post(
      API_URL + "user/availability",
      {
        availSeniorPersonnel: data.availSeniorPersonnel,
        city: data.city,
        courseRequestType: JSON.stringify(data.courseRequestType),
        ethnicity: data.ethnicity,
        gender: data.gender,
        insState: data.insState,
        insType: data.insType,
        limitAccess: data.limitAccess,
        noOfStudent: data.noOfStudent,
        others: data.others,
        physicalDis: JSON.stringify(data.physicalDis),
        physicalDisConcern: JSON.stringify(data.physicalDisConcern),
        projectOverview: data.projectOverview,
        projectStage: data.projectStage,
        safetyRequirement: data.safetyRequirement,
        sizeCourseSupport: data.sizeCourseSupport,
        classSize: data.classSize,
        academicLevel: data.academicLevel,
        studentDept: data.studentDept,
        genderProp: data.genderProp,
        ethnicDiv: data.ethnicDiv,
        stuPhysicalDis: JSON.stringify(data.stuPhysicalDis),
        insDeliveryType: data.insDeliveryType,
        Phone: data.Phone,
        phoneNumber: data.phoneNumber,
        userId: store.state.auth.user.id,
      },
      { headers: authHeader() }
    );
  }

  getAvailability() {
    console.log(API_URL + "user/availability");
    return axios.get(API_URL + "user/availability", { headers: authHeader() });
  }

  uploadData(data) {
    console.log("Trying To upload " + API_URL + "user/upload");
    console.log("UserId " + store.state.auth.user.id);
    console.log(data);
    return axios.post(API_URL + "user/upload", data, {
      headers: authHeader(),
    });
  }

  getUploads() {
    console.log(API_URL + "user/upload");
    return axios.get(API_URL + "user/upload", { headers: authHeader() });
  }

  selectIndustryPractitioner(course, industryPractitioner) {
    console.log(course.id);
    console.log(API_URL + "user/practitioner");
    return axios.post(
      API_URL + "user/practitioner",
      {
        id: course.id,
        industryPractitionerUserId: industryPractitioner.userId,
      },
      {
        headers: authHeader(),
      }
    );
  }

  selectCourse(course) {
    console.log(course.id);
    console.log(API_URL + "user/practitioner/course");
    return axios.post(
      API_URL + "user/practitioner/course",
      {
        id: course.id,
        industryPractitionerUserId: store.state.auth.user.id,
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserService();
