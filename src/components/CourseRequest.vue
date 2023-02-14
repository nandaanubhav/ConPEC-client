<script setup lang="ts">
import { displayLabels, physicalDisOptions } from "@/utils";

import { useStore } from "vuex";
const store = useStore();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import UserService from "@/services/user.service.js";
import Datepicker from "@vuepic/vue-datepicker";
import Multiselect from "@vueform/multiselect";
import "@vuepic/vue-datepicker/dist/main.css";
import PopupModal from "../components/PopupModal";
import { ref } from "vue";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let isVisible = ref(false);

const showPopup = () => {
  isVisible.value = true;
};

const hidePopup = () => {
  isVisible.value = false;
};

const currentUser = store.state.auth.user;

let loading = false;
let successful = false;
let message = "";

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

let initialState = {
  Phone: "",
  phoneNumber: "",
};

if (store.state.user) {
  initialState.Phone = currentUser.Phone;
  initialState.phoneNumber = currentUser.phoneNumber;
}

const formValues = {
  Email: "True",
  Phone: initialState.Phone,
  phoneNumber: initialState.phoneNumber,
};

const saveCourseRequest = (data) => {
  loading = true;
  if (data.studentDept === "Others")
    data.studentDept = data["studentDept-text"];
  if (data.gender === "Others") data.gender = data["gender-text"];
  if (data.ethnicity === "Others") data.ethnicity = data["ethnicity-text"];
  if (data.noOfFreq === "Others") data.noOfFreq = data["noOfFreq-text"];

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

const schema = yup.object().shape({
  academicLevel: yup.string().required("Students' academic level is required!"),
  ageRange: yup.string().required("Age Range is required!"),
  areaOfExpertise: yup
    .string()
    .required("Area of Expertise/Specialization is required!"),
  classSize: yup.number().required("Class Size is required!"),
  courseRequestType: yup.string().required("Course Support Type is required!"),
  duration: yup.string().required("Duration of Course Support is required!"),
  ethnicDiv: yup.string().required("Ethnic Diversity of students is required!"),
  ethnicity: yup.string().required("Ethnicity is required!"),
  gender: yup.string().required("Gender is required!"),
  genderProp: yup
    .string()
    .required("Gender proportion of students is required!"),
  indusSupportSize: yup
    .string()
    .required(
      "Size of industry-support team required by the instructor is required!"
    ),
  learning: yup
    .string()
    .required("Learning objective/Expected Outcome is required!"),
  levelEducation: yup.string().required("Level of education is required!"),
  needForPreVisit: yup
    .string()
    .required("Need for Pre-Visit by the instructor is required!"),
  noOfFreq: yup
    .string()
    .required("Number/Frequency of Course Support is required!"),
  physicalDis: yup.array(),
  physicalDisConcern: yup.array(),
  studentDept: yup
    .string()
    .required("Students' department or Program of study is required!"),
  topic: yup.string().required("Topic requiring Course Support is required!"),
  yearsOfExp: yup.string().required("Years of Experience is required!"),
  date: yup.string().required("Date for Course Support is required!"),
  time: yup.object().required("Time for Course Support is required!"),
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
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
  <div v-if="currentUser" class="col-md-12">
    <div class="card card-container">
      <h2 style="text-align: center">Course Support Request Information</h2>
      <div>
        <Form
          @submit="saveCourseRequest"
          v-slot="{ values }"
          :validation-schema="schema"
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
            <label for="insDeliveryType">Instruction Delivery Type</label>
            <Field
              name="insDeliveryType"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
            </Field>
            <ErrorMessage name="insDeliveryType" class="error-feedback" />
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
              <option value="First Year">First Year</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </Field>
            <ErrorMessage name="academicLevel" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="studentDept">
              Students' department or Program of study</label
            >
            <Field name="studentDept" type="text" class="dropdown" as="select">
              <option value="Architectural Science">
                Architectural Science
              </option>
              <option value="Building Construction">
                Building Construction
              </option>
              <option value="Building and Construction Technology">
                Building and Construction Technology
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Civil and Environmental Engineering">
                Civil and Environmental Engineering
              </option>
              <option value=" Construction Engineering">
                Construction Engineering
              </option>
              <option value="Construction Management">
                Construction Management
              </option>
              <option value="Construction Technology">
                Construction Technology
              </option>
              <option value="Construction Science">Construction Science</option>
              <option value="Construction Engineering and Management">
                Construction Engineering and Management
              </option>
              <option value="Real Estate and Construction Management">
                Real Estate and Construction Management
              </option>
              <option value="Geomatics">Geomatics</option>
              <option value="Others">Others</option>
              Others
            </Field>
            <div v-if="values.studentDept === 'Others'">
              <Field
                name="studentDept-text"
                type="text"
                placeholder="Please Specify"
                class="form-control"
              />
            </div>
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
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Slightly">Slightly</option>
              <option value="Not diverse and inclusive">
                Not diverse and inclusive
              </option>
            </Field>
            <ErrorMessage name="ethnicDiv" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="physicalDis">Physical disabilities of students</label>
            <multiselect
              v-model="values.physicalDis"
              :options="physicalDisOptions"
              mode="multiple"
              :multipleLabel="displayLabels"
            />
            <ErrorMessage name="physicalDis" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="date">When the course support is needed</label>
            <Datepicker
              v-model="values.date"
              :enableTimePicker="false"
              placeholder="Date"
            ></Datepicker>
            <Field name="date" type="text" class="form-control" hidden />
            <ErrorMessage name="date" class="error-feedback" />
            <Datepicker v-model="values.time" placeholder="Time" timePicker />
            <Field name="time" type="text" class="form-control" hidden />
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
              <option value="One-off">One-off</option>
              <option value="Once in a month">Once in a month</option>
              <option value="Once in two months">Once in two months</option>
              <option value="Once in three months">Once in three months</option>
              <option value="Throughout the semester">
                Throughout the semester
              </option>
              <option value="Others">Others</option>
            </Field>
            <div v-if="values.noOfFreq === 'Others'">
              <Field
                name="noOfFreq-text"
                type="text"
                placeholder="Please Specify"
                class="form-control"
              />
            </div>
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
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
            v-if="values.courseRequestType === 'Site Visit'"
          >
            <label for="siteOffice"
              >Need to visit the office trailer/site office</label
            >
            <Field name="siteOffice" type="text" class="dropdown" as="select">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Field>
            <ErrorMessage name="siteOffice" class="error-feedback" />
          </div>
          <div
            class="form-group"
            v-if="showIndusSupportSize(values.courseRequestType)"
          >
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
                placeholder="Please Specify"
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
              <option value="26 - 30 years">26 – 30 years</option>
              <option value="31 - 35 years">31 – 35 years</option>
              <option value="36 - 40 years">36 – 40 years</option>
              <option value="41 - 45 years">41 – 45 years</option>
              <option value="46 - 50 years">45 – 50 years</option>
              <option value="51 - 55 years">51 – 55 years</option>
              <option value="56 - 60 years">56 – 60 years</option>
              <option value="61+ years">61+ years</option>
            </Field>
            <ErrorMessage name="ageRange" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="ethnicity">Ethnicity</label>
            <Field name="ethnicity" type="text" class="dropdown" as="select">
              <option value="American Indian or Alaska Native">
                American Indian or Alaska Native
              </option>
              <option value="Asian">Asian</option>
              <option value="Black or African American">
                Black or African American
              </option>
              <option value="Hispanic or Latinx">Hispanic or Latinx</option>
              <option value="Native Hawaiian or other Pacific Islander">
                Native Hawaiian or other Pacific Islander
              </option>
              <option value="White/Caucasian">White/Caucasian</option>
              <option value="Others">Others</option>
            </Field>
            <div v-if="values.ethnicity === 'Others'">
              <Field
                name="ethnicity-text"
                type="text"
                placeholder="Please Specify"
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
              <option value="15 - 20 years">15 – 20 years</option>
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
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor’s degree">Bachelor’s degree</option>
              <option value="Master’s degree">Master’s degree</option>
              <option value="Ph.D.">Ph.D.</option>
            </Field>
            <ErrorMessage name="levelEducation" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="countryStudy">Country of Study</label>
            <country-select v-model="values.countryStudy" class="dropdown" />
            <ErrorMessage name="countryStudy" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="physicalDisConcern"
              >Any physical disability concern</label
            >
            <multiselect
              v-model="values.physicalDisConcern"
              :options="physicalDisOptions"
              mode="multiple"
              :multipleLabel="displayLabels"
            />
            <ErrorMessage name="physicalDisConcern" class="error-feedback" />
          </div>

          <br />
          <div class="align-center">
            <button type="button" class="btn btn-dark" @click="showPopup">
              Raise Course Request
            </button>
          </div>

          <PopupModal :visible="isVisible" @close="hidePopup">
            <template v-slot:title> Contact Preference</template>
            <template v-slot:content>
              <div class="form-group">
                <label for="contactPref"
                  >Please select how would you like to be contacted?</label
                >
                <Field
                  name="Email"
                  value="True"
                  type="checkbox"
                  disabled
                />Email
                <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Phone"
                  type="checkbox"
                />
                Phone
                <br />
                <ErrorMessage name="contactPref" class="error-feedback" />
              </div>

              <div class="form-group" v-if="values.Phone === 'True'">
                <label for="phoneNumber">Phone Number</label>
                <Field name="phoneNumber" type="text" class="form-control" />
                <ErrorMessage name="phoneNumber" class="error-feedback" />
              </div>
              <br />
              <div class="form-group align-center">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Proceed</span>
                </button>
              </div>
            </template>
          </PopupModal>
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
