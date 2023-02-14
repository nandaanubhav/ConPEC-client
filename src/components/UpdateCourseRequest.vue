<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import UserService from "@/services/user.service.js";
import Datepicker from "@vuepic/vue-datepicker";
import Multiselect from "@vueform/multiselect";

import "@vuepic/vue-datepicker/dist/main.css";

let loading = false;
let successful = false;
let message = "";

console.log(route.params);

const schema = yup.object().shape({
  location: yup.string().required("Location is required!"),
  department: yup.string().required("Department is required!"),
  physicalDis: yup.string(),
  ageRange: yup.string().required("Age Range is required!"),
});

const showVisualRep = (value) => {
  if (value === "Labs" || value === "Site Visit" || value === "Workshop") {
    return true;
  }
  return false;
};

const showIndusSupportSize = (value) => {
  if (
    value === "Guest Lecture/Classroom Teaching" ||
    value === "Seminar" ||
    value === "Workshop"
  ) {
    return true;
  }
  return false;
};

const saveCourseRequest = (data) => {
  loading = true;
  console.log(data);
  UserService.saveCourseRequest(data).then(
    (response) => {
      console.log(response.data);
      router.push({ name: "instructor-feed" });
      loading = false;
    },
    (error) => {
      loading = false;
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
};

let options = [
  "None",
  "Mobility impairment",
  "Hearing impairment",
  "Vision impairment",
  "Speech impairment",
  "Autism",
  "Attention-deficit/hyperactivity disorder (ADHD)",
  "Others",
];

let initialState = {
  academicLevel: "",
  ageRange: "",
  areaOfExpertise: "",
  classSize: "",
  countryStudy: "",
  courseRequestType: "",
  date: "",
  duration: "",
  ethnicDiv: "",
  ethnicity: "",
  gender: "",
  genderProp: "",
  indusSupportSize: "",
  learning: "",
  levelEducation: "",
  needForPreVisit: "",
  noOfFreq: "",
  physicalDis: [],
  physicalDisConcern: [],
  siteOffice: "",
  studentDept: "",
  topic: "",
  time: {},
  visualRep: "",
  yearsOfExp: "",
};

console.log(store.state.user.course);

if (store.state.user.course) {
  initialState.academicLevel = store.state.user.course.academicLevel;
  initialState.ageRange = store.state.user.course.ageRange;
  initialState.areaOfExpertise = store.state.user.course.areaOfExpertise;
  initialState.classSize = store.state.user.course.classSize;
  initialState.countryStudy = store.state.user.course.countryStudy;
  initialState.courseRequestType = store.state.user.course.courseRequestType;
  initialState.date = store.state.user.course.date;
  initialState.duration = store.state.user.course.duration;
  initialState.ethnicDiv = store.state.user.course.ethnicDiv;
  initialState.ethnicity = store.state.user.course.ethnicity;
  initialState.gender = store.state.user.course.gender;
  initialState.genderProp = store.state.user.course.genderProp;
  initialState.indusSupportSize = store.state.user.course.indusSupportSize;
  initialState.learning = store.state.user.course.learning;
  initialState.levelEducation = store.state.user.course.levelEducation;
  initialState.needForPreVisit = store.state.user.course.needForPreVisit;
  initialState.noOfFreq = store.state.user.course.noOfFreq;
  initialState.physicalDis = JSON.parse(store.state.user.course.physicalDis);
  initialState.physicalDisConcern = JSON.parse(
    store.state.user.course.physicalDisConcern
  );
  initialState.siteOffice = store.state.user.course.siteOffice;
  initialState.studentDept = store.state.user.course.studentDept;
  initialState.time = JSON.parse(store.state.user.course.time);
  initialState.topic = store.state.user.course.topic;
  initialState.visualRep = store.state.user.course.visualRep;
  initialState.yearsOfExp = store.state.user.course.yearsOfExp;
}

const formValues = {
  academicLevel: initialState.academicLevel,
  ageRange: initialState.ageRange,
  areaOfExpertise: initialState.areaOfExpertise,
  classSize: initialState.classSize,
  countryStudy: initialState.countryStudy,
  courseRequestType: initialState.courseRequestType,
  date: initialState.date,
  duration: initialState.duration,
  ethnicDiv: initialState.ethnicDiv,
  ethnicity: initialState.ethnicity,
  gender: initialState.gender,
  genderProp: initialState.genderProp,
  indusSupportSize: initialState.indusSupportSize,
  learning: initialState.learning,
  levelEducation: initialState.levelEducation,
  needForPreVisit: initialState.needForPreVisit,
  noOfFreq: initialState.noOfFreq,
  physicalDis: initialState.physicalDis,
  physicalDisConcern: initialState.physicalDisConcern,
  siteOffice: initialState.siteOffice,
  studentDept: initialState.studentDept,
  topic: initialState.topic,
  time: initialState.time,
  visualRep: initialState.visualRep,
  yearsOfExp: initialState.yearsOfExp,
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 850px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.dropdown {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.error-feedback {
  color: red;
}
</style>

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h2 style="text-align: center">Course Support Request Information</h2>
      <div>
        <Form
          @submit="saveCourseRequest"
          v-slot="{ values }"
          :initial-values="formValues"
        >
          <div class="form-group">
            <label for="courseRequestType">Course Support Type</label>
            <Field
              name="courseRequestType"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="Seminar">Seminar</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Workshop">Workshop</option>
              <option value="Guest Lecture/Classroom Teaching">
                Guest Lecture/Classroom Teaching
              </option>
              <option value="Mentor/Sponsor for Capstone Project">
                Mentor/Sponsor for Capstone Project
              </option>
              <option value="Labs">Labs</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage name="courseRequestType" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="classSize">Class Size</label>
            <Field name="classSize" type="text" class="form-control" />
            <ErrorMessage name="classSize" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="academicLevel">Students' academic level</label>
            <Field
              name="academicLevel"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="firstYear">First Year</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </Field>
            <ErrorMessage name="academicLevel" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="studentDept">
              Students' department or Program of study</label
            >
            <Field name="studentDept" type="text" class="dropdown" as="select">
              <option value="architecturalScience">
                Architectural Science
              </option>
              <option value="buildingConstruction">
                Building Construction
              </option>
              <option value="buildingAndConstructionTechnology">
                Building and Construction Technology
              </option>
              <option value="civilEngineering">Civil Engineering</option>
              <option value="civilAndEnvironmentalEngineering">
                Civil and Environmental Engineering
              </option>
              <option value="constructionEngineering">
                Construction Engineering
              </option>
              <option value="constructionManagement">
                Construction Management
              </option>
              <option value="constructionTechnology">
                Construction Technology
              </option>
              <option value="constructionScience">Construction Science</option>
              <option value="constructionEngineeringAndManagement">
                Construction Engineering and Management
              </option>
              <option value="realEstateAndConstructionManagement">
                Real Estate and Construction Management
              </option>
              <option value="geomatics">Geomatics</option>
              <option value="others">Others</option>

              Others, please specify
            </Field>
            <ErrorMessage name="studentDept" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="genderProp"
              >Gender proportion of students (Male : Female : Others)</label
            >
            <Field name="genderProp" type="text" class="form-control" />
            <ErrorMessage name="genderProp" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="ethnicDiv">Ethnic Diversity of students</label>
            <Field name="ethnicDiv" type="text" class="dropdown" as="select">
              <option value="veryHigh">Very High</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="slightly">Slightly</option>
              <option value="notDiverseAndInclusive">
                Not diverse and inclusive
              </option>
            </Field>
            <ErrorMessage name="ethnicDiv" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="physicalDis">Physical disabilities of students</label>
            <multiselect
              v-model="values.physicalDis"
              :options="options"
              mode="multiple"
            />
            <ErrorMessage name="physicalDis" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="date">When the course support is needed</label>
            <Datepicker
              v-model="values.date"
              :enableTimePicker="false"
            ></Datepicker>
            <ErrorMessage name="date" class="error-feedback" />
            <Datepicker v-model="values.time" timePicker />
            <ErrorMessage name="time" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="duration">Duration of Course Support </label>
            <Field
              name="duration"
              type="text"
              class="form-control"
              placeholder="(in minutes)"
            />
            <ErrorMessage name="duration" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="noOfFreq">Number/Frequency of Course Support</label>
            <Field name="noOfFreq" type="text" class="dropdown" as="select">
              <option value="oneOff">One-off</option>
              <option value="onceInAMonth">Once in a month</option>
              <option value="onceInTwoMonths">Once in two months</option>
              <option value="onceInThreeMonths">Once in three months</option>
              <option value="throughoutTheSemester">
                Throughout the semester
              </option>
              <option value="others">Others</option>
            </Field>
            <ErrorMessage name="noOfFreq" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="topic">Topic requiring Course Support</label>
            <Field name="topic" type="text" class="form-control" />
            <ErrorMessage name="location" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="learning">Learning objective/Expected Outcome</label>
            <Field name="learning" type="text" class="form-control" />
            <ErrorMessage name="learning" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="needForPreVisit">
              Need for Pre-Visit by the instructor</label
            >
            <Field
              name="needForPreVisit"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
            <ErrorMessage name="needForPreVisit" class="error-feedback" />
          </div>
          <div
            class="form-group"
            v-if="showVisualRep(values.courseRequestType)"
          >
            <label for="visualRep"
              >Specific demonstrations/ Visual Representation Required</label
            >
            <Field name="visualRep" type="text" class="form-control" />
            <ErrorMessage name="visualRep" class="error-feedback" />
          </div>
          <div
            class="form-group"
            v-if="values.courseRequestType === 'siteVisit'"
          >
            <label for="siteOffice"
              >Need to visit the office trailer/site office</label
            >
            <Field name="siteOffice" type="text" class="dropdown" as="select">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
            <ErrorMessage name="siteOffice" class="error-feedback" />
          </div>
          <div class="form-group" v-if="values.courseRequestType !== 'lab'">
            <label for="indusSupportSize"
              >Size of industry-support team required by the instructor</label
            >
            <Field name="indusSupportSize" type="text" class="form-control" />
            <ErrorMessage name="indusSupportSize" class="error-feedback" />
          </div>
          <br />
          <div class="align-center" style="font-weight: bold">
            Preference Definition (Industry Practitioner-related)
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <Field name="gender" type="text" class="dropdown" as="select">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Others">Others</option>
            </Field>
            <div v-if="values.gender === 'Others'">
              <Field
                name="gender-text"
                type="text"
                placeholder=""
                class="form-control"
              />
            </div>
            <ErrorMessage name="gender" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="ageRange">Age Range</label>
            <Field name="ageRange" type="text" class="dropdown" as="select">
              <option value="18 – 20 years">18 – 20 years</option>
              <option value="21 – 25 years">21 – 25 years</option>
              <option value="26 – 30 years">26 – 30 years</option>
              <option value="31 – 35 years">31 – 35 years</option>
              <option value="36 – 40 years">36 – 40 years</option>
              <option value="41 – 45 years">41 – 45 years</option>
              <option value="45 – 50 years">45 – 50 years</option>
              <option value="51 – 55 years">51 – 55 years</option>
              <option value="56 – 60 years">56 – 60 years</option>
              <option value="61+ years">61+ years</option>
            </Field>
            <ErrorMessage name="ageRange" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="ethnicity">Ethnicity</label>
            <Field name="ethnicity" type="text" class="dropdown" as="select">
              <option value="americanIndianOrAlaskaNative">
                American Indian or Alaska Native
              </option>
              <option value="Asian">Asian</option>
              <option value="BlackOrAfricanAmerican">
                Black or African American
              </option>
              <option value="HispanicOrLatinx">Hispanic or Latinx</option>
              <option value="NativeHawaiianOrOtherPacificIslander">
                Native Hawaiian or other Pacific Islander
              </option>
              <option value="White/Caucasian">White/Caucasian</option>
              <option value="Others">Others</option>
            </Field>
            <div v-if="values.ethnicity === 'Others'">
              <Field
                name="ethnicity-text"
                type="text"
                placeholder=""
                class="form-control"
              />
            </div>
            <ErrorMessage name="ethnicity" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="yearsOfExp">Years of Experience</label>
            <Field name="yearsOfExp" type="text" class="dropdown" as="select">
              <option value="1 - 5 years">1 - 5 years</option>
              <option value="6 - 10 years">6 - 10 years</option>
              <option value="11 - 15 years">11 - 15 years</option>
              <option value="15 – 20 years">15 – 20 years</option>
              <option value="21 – 25 years">21 – 25 years</option>
              <option value="26+ years">26+ years</option>
            </Field>
            <ErrorMessage name="yearsOfExp" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="areaOfExpertise"
              >Area of Expertise/Specialization</label
            >
            <Field name="areaOfExpertise" type="text" class="form-control" />
            <ErrorMessage name="areaOfExpertise" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="levelEducation">Level of education</label>
            <Field
              name="levelEducation"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="highSchool">High School</option>
              <option value="diploma">Diploma</option>
              <option value="Bachelor’s degree">Bachelor’s degree</option>
              <option value="Master’s degree">Master’s degree</option>
              <option value="Ph.D.">Ph.D.</option>
            </Field>
            <ErrorMessage name="levelEducation" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="countryStudy">Country of Study</label>
            <Field name="countryStudy" type="text" class="form-control" />
            <ErrorMessage name="countryStudy" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="physicalDisConcern"
              >Any physical disability concern</label
            >
            <multiselect
              v-model="values.physicalDisConcern"
              :options="options"
              mode="multiple"
            />
            <ErrorMessage name="physicalDisConcern" class="error-feedback" />
          </div>

          <br />
          <div class="form-group align-center">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Update Course Request</span>
            </button>
          </div>
        </Form>
      </div>
      <div
        v-if="message"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
