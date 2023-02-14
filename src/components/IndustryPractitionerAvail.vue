<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import Multiselect from "@vueform/multiselect";

import * as yup from "yup";
const schema = yup.object().shape({
  // courseRequestType: yup.array().required("Course Support Type is required!"),
  // insType: yup.string().required("Type of institution is required!"),
  // insState: yup.string().required("Location of institution is required!"),
  // gender: yup.string().required("Gender is required!"),
  // ethnicity: yup.string().required("Ethnicity is required!"),
  // physicalDisConcern: yup
  //   .array()
  //   .required("Physical disabilities concern is required!"),
});

import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";
import { ref } from "vue";
import PopupModal from "../components/PopupModal";

let isVisible = ref(false);

const currentUser = store.state.auth.user;

let loading = false;
let successful = false;
let message = "";

const displayLabels = (values) => {
  let value = JSON.parse(JSON.stringify(values)).map((x) => x["label"]);
  return value.join(", ");
};

let physicalDisOptions = [
  "None",
  "Mobility impairment",
  "Hearing impairment",
  "Vision impairment",
  "Speech impairment",
  "Autism",
  "Attention-deficit/hyperactivity disorder (ADHD)",
  "Others",
];

let courseReqOptions = [
  "Seminar",
  "Site Visit",
  "Workshop",
  "Guest Lecture/Classroom Teaching",
  "Mentor/Sponsor for Capstone Project",
  "Labs",
  "Others",
];

const isSiteVisitSelected = (value) => {
  if (typeof value !== "undefined") {
    if (value["Site Visit"] === "True") {
      return true;
    }
  }
  return false;
};

const isGuestSeminarSelected = (value) => {
  if (typeof value !== "undefined") {
    if (
      value["Seminar"] === "True" ||
      value["Guest Lecture/Classroom Teaching"] === "True"
    ) {
      return true;
    }
  }
  return false;
};

const isCourseTypeSelected = (value) => {
  if (typeof value !== "undefined") {
    if (
      value["Seminar"] === "True" ||
      value["Site Visit"] === "True" ||
      value["Workshop"] === "True" ||
      value["Guest Lecture/Classroom Teaching"] === "True" ||
      value["Mentor/Sponsor for Capstone Project"] === "True" ||
      value["Labs"] === "True" ||
      value["Others"] === "True"
    ) {
      return true;
    }
  }
  console.log("Returning False");
  return false;
};

const showPopup = () => {
  console.log("showPopup");
  isVisible.value = true;
};

const hidePopup = () => {
  isVisible.value = false;
};

const saveAvailability = (data) => {
  console.log("In saveAvailability");
  loading = true;
  console.log(data);
  data["courseRequestType"] = [];
  courseReqOptions.forEach((el) => {
    if (data[el] === "True") data.courseRequestType.push(el);
  });
  console.log(data["courseRequestType"]);
  UserService.saveAvailability(data).then(
    (response) => {
      router.push({ name: "industry-practitioner-feed" });
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

let initialState = {
  "Guest Lecture/Classroom Teaching": "False",
  Seminar: "False",
  "Mentor/Sponsor for Capstone Project": "False",
  Others: "False",
  "Site Visit": "False",
  Workshop: "False",
  Labs: "False",
  availSeniorPersonnel: "",
  city: "",
  ethnicity: "",
  gender: "",
  insState: "",
  insType: "",
  limitAccess: "",
  noOfStudent: "",
  others: "",
  physicalDis: [],
  physicalDisConcern: [],
  projectOverview: "",
  projectStage: "",
  safetyRequirement: "",
  sizeCourseSupport: "",
  classSize: "",
  academicLevel: "",
  studentDept: "",
  genderProp: "",
  ethnicDiv: "",
  stuPhysicalDis: [],
  insDeliveryType: "",
  Phone: "",
  phoneNumber: "",
};

if (store.state.user.course) {
  initialState["Guest Lecture/Classroom Teaching"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Guest Lecture/Classroom Teaching")
    ? "True"
    : "False";
  initialState["Seminar"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Seminar")
    ? "True"
    : "False";
  initialState["Mentor/Sponsor for Capstone Project"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Mentor/Sponsor for Capstone Project")
    ? "True"
    : "False";
  initialState["Others"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Others")
    ? "True"
    : "False";
  initialState["Site Visit"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Site Visit")
    ? "True"
    : "False";
  initialState["Workshop"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Workshop")
    ? "True"
    : "False";
  initialState["Labs"] = JSON.parse(
    store.state.user.course.courseRequestType
  ).includes("Labs")
    ? "True"
    : "False";
  initialState.availSeniorPersonnel =
    store.state.user.course.availSeniorPersonnel;
  initialState.city = store.state.user.course.city;
  initialState.ethnicity = store.state.user.course.ethnicity;
  initialState.gender = store.state.user.course.gender;
  initialState.insState = store.state.user.course.insState;
  initialState.insType = store.state.user.course.insType;
  initialState.limitAccess = store.state.user.course.limitAccess;
  initialState.noOfStudent = store.state.user.course.noOfStudent;
  initialState.others = store.state.user.course.others;
  initialState.physicalDis = JSON.parse(store.state.user.course.physicalDis);
  initialState.physicalDisConcern = JSON.parse(
    store.state.user.course.physicalDisConcern
  );
  initialState.projectOverview = store.state.user.course.projectOverview;
  initialState.projectStage = store.state.user.course.projectStage;
  initialState.safetyRequirement = store.state.user.course.safetyRequirement;
  initialState.sizeCourseSupport = store.state.user.course.sizeCourseSupport;
  initialState.classSize = store.state.user.course.classSize;
  initialState.academicLevel = store.state.user.course.academicLevel;
  initialState.studentDept = store.state.user.course.studentDept;
  initialState.genderProp = store.state.user.course.genderProp;
  initialState.ethnicDiv = store.state.user.course.ethnicDiv;
  initialState.stuPhysicalDis = JSON.parse(
    store.state.user.course.stuPhysicalDis
  );
  initialState.insDeliveryType = store.state.user.course.insDeliveryType;
  initialState.Phone = currentUser.Phone;
  initialState.phoneNumber = currentUser.phoneNumber;
}

const formValues = {
  "Guest Lecture/Classroom Teaching":
    initialState["Guest Lecture/Classroom Teaching"],
  Seminar: initialState.Seminar,
  "Mentor/Sponsor for Capstone Project":
    initialState["Mentor/Sponsor for Capstone Project"],
  Others: initialState.Others,
  "Site Visit": initialState["Site Visit"],
  Workshop: initialState.Workshop,
  Labs: initialState.Labs,
  availSeniorPersonnel: initialState.availSeniorPersonnel,
  city: initialState.city,
  ethnicity: initialState.ethnicity,
  gender: initialState.gender,
  insState: initialState.insState,
  insType: initialState.insType,
  limitAccess: initialState.limitAccess,
  noOfStudent: initialState.noOfStudent,
  others: initialState.others,
  physicalDis: initialState.physicalDis,
  physicalDisConcern: initialState.physicalDisConcern,
  projectOverview: initialState.projectOverview,
  projectStage: initialState.projectStage,
  safetyRequirement: initialState.safetyRequirement,
  sizeCourseSupport: initialState.sizeCourseSupport,
  classSize: initialState.classSize,
  academicLevel: initialState.academicLevel,
  studentDept: initialState.studentDept,
  genderProp: initialState.genderProp,
  ethnicDiv: initialState.ethnicDiv,
  stuPhysicalDis: initialState.stuPhysicalDis,
  insDeliveryType: initialState.insDeliveryType,
  Email: "True",
  Phone: initialState.Phone,
  phoneNumber: initialState.phoneNumber,
};

let cancButtonObj = { text: "" };
let okButtonObj = {
  text: "",
};
</script>

<style scoped>
.card-container.card {
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

.error-feedback {
  color: red;
}
</style>

<template>
  <div class="col-md-12">
    <div>
      <h3 class="align-center" style="margin: 1em">
        Type of Course Support Willing to Provide
      </h3>
      <br />
      <div>
        <Form
          @submit="saveAvailability"
          v-slot="{ values }"
          :validation-schema="schema"
          :initial-values="formValues"
        >
          <div style="display: grid; grid-template-columns: 1fr 6fr 20fr 5fr">
            <div></div>
            <div
              class="card card-container"
              style="height: max-content; width: 400px"
            >
              <div class="form-group">
                <label for="courseRequestType">Course Support Type</label>
                <br />
                <Field
                  name="Seminar"
                  value="True"
                  unchecked-value="False"
                  type="checkbox"
                />Seminar
                <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Site Visit"
                  type="checkbox"
                />Site Visit
                <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Workshop"
                  type="checkbox"
                />Workshop
                <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Guest Lecture/Classroom Teaching"
                  type="checkbox"
                />
                Guest Lecture/Classroom Teaching <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Mentor/Sponsor for Capstone Project"
                  type="checkbox"
                />
                Mentor/Sponsor for Capstone Project <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Labs"
                  type="checkbox"
                />Labs <br />
                <Field
                  value="True"
                  unchecked-value="False"
                  name="Others"
                  type="checkbox"
                />Others <br />
                <ErrorMessage name="courseRequestType" class="error-feedback" />
              </div>
            </div>
            <div
              class="card card-container"
              v-if="isCourseTypeSelected(values)"
              style="width: 650px"
            >
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

              <div
                class="align-center"
                style="font-weight: bold; color: red"
                v-if="isSiteVisitSelected(values)"
              >
                <br />
                Site Visit
              </div>

              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="city">Location of job site</label>
                <Field
                  id="city"
                  name="city"
                  type="text"
                  class="form-control"
                  placeholder="City"
                />
                <ErrorMessage name="city" class="error-feedback" />
                &nbsp;
                <region-select
                  v-model="values.state"
                  :region="values.state"
                  class="dropdown"
                  placeholder="Select State"
                />
                <ErrorMessage name="state" class="error-feedback" />
              </div>

              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="noOfStudent"
                  >Number of student that can be accommodated</label
                >
                <Field name="noOfStudent" type="text" class="form-control" />
                <ErrorMessage name="noOfStudent" class="error-feedback" />
              </div>
              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="physicalDis"
                  >Type of Physical Disabilities that can be accommodated</label
                >
                <multiselect
                  v-model="values.physicalDis"
                  :options="physicalDisOptions"
                  mode="multiple"
                  :multipleLabel="displayLabels"
                />
                <ErrorMessage name="physicalDis" class="error-feedback" />
              </div>
              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="limitAccess"
                  >Limit/Extent of access to site allow</label
                >
                <Field name="limitAccess" type="text" class="form-control" />
                <ErrorMessage name="limitAccess" class="error-feedback" />
              </div>
              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="projectStage">Project Stage</label>
                <Field name="projectStage" type="text" class="form-control" />
                <ErrorMessage name="projectStage" class="error-feedback" />
              </div>
              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="projectOverview">General Project Overview</label>
                <Field
                  name="projectOverviewDuration"
                  type="text"
                  class="form-control"
                  placeholder="Duration (in months)"
                />
                <Field
                  name="projectOverviewCost"
                  type="text"
                  class="form-control"
                  placeholder="Cost (in dollars)"
                />
                <Field
                  name="projectOverviewClient"
                  type="text"
                  class="form-control"
                  placeholder="Client"
                />

                <ErrorMessage name="projectOverview" class="error-feedback" />
              </div>
              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="safetyRequirement">Safety Requirement</label>
                <Field
                  name="safetyRequirement"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="safetyRequirement" class="error-feedback" />
              </div>

              <div class="form-group" v-if="isSiteVisitSelected(values)">
                <label for="availSeniorPersonnel"
                  >Availability of senior personnel during site visit</label
                >
                <Field
                  name="availSeniorPersonnel"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage
                  name="availSeniorPersonnel"
                  class="error-feedback"
                />
              </div>

              <div
                class="align-center"
                style="font-weight: bold; color: red"
                v-if="isGuestSeminarSelected(values)"
              >
                <br />
                Guest Lecture/Seminar
              </div>
              <div class="form-group" v-if="isGuestSeminarSelected(values)">
                <label for="sizeCourseSupport"
                  >Size of course-support team willing to provide</label
                >
                <Field
                  name="sizeCourseSupport"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="sizeCourseSupport" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="others">Others</label>
                <Field name="others" type="text" class="form-control" />
                <ErrorMessage name="others" class="error-feedback" />
              </div>

              <br />
              <div class="align-center" style="font-weight: bold">
                Preference Definition (Institution-related)
              </div>

              <div class="form-group">
                <label for="insType">Type of Institution</label>
                <Field name="insType" type="text" class="dropdown" as="select">
                  <option value="Predominantly White Institution">
                    Predominantly White Institution
                  </option>
                  <option value="Historically Black Institution">
                    Historically Black Institution
                  </option>
                  <option value="Hispanic Serving Institution">
                    Hispanic Serving Institution
                  </option>
                  <option value="Others">Others</option>
                </Field>
                <div v-if="values.insType === 'Others'">
                  <Field
                    name="insType-text"
                    type="text"
                    placeholder=""
                    class="form-control"
                  />
                </div>

                <ErrorMessage name="insType" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="insState">Location of Institution</label>
                <region-select
                  v-model="values.insState"
                  :region="values.insState"
                  class="dropdown"
                  placeholder="Select State"
                />
                <ErrorMessage name="insState" class="error-feedback" />
              </div>

              <br />
              <div class="align-center" style="font-weight: bold">
                Preference Definition (Instructor-related)
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
                <label for="ethnicity">Ethnicity</label>
                <Field
                  name="ethnicity"
                  type="text"
                  class="dropdown"
                  as="select"
                >
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
                <label for="physicalDisConcern"
                  >Any physical disability concern</label
                >
                <multiselect
                  v-model="values.physicalDisConcern"
                  :options="physicalDisOptions"
                  mode="multiple"
                  :multipleLabel="displayLabels"
                />
                <ErrorMessage
                  name="physicalDisConcern"
                  class="error-feedback"
                />
              </div>

              <br />
              <div class="align-center" style="font-weight: bold">
                Preference Definition (Students-related)
              </div>

              <div class="form-group">
                <label for="classSize"
                  >Number of students willing to accommodate</label
                >
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
                <Field
                  name="studentDept"
                  type="text"
                  class="dropdown"
                  as="select"
                >
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
                  <option value="Construction Engineering">
                    Construction Engineering
                  </option>
                  <option value=" Construction Management">
                    Construction Management
                  </option>
                  <option value=" Construction Technology">
                    Construction Technology
                  </option>
                  <option value="Construction Science">
                    Construction Science
                  </option>
                  <option value="Construction Engineering and Management">
                    Construction Engineering and Management
                  </option>
                  <option value=" Real Estate and Construction Management">
                    Real Estate and Construction Management
                  </option>
                  <option value="Geomatics">Geomatics</option>
                  <option value="Others">Others</option>
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
                <Field
                  name="ethnicDiv"
                  type="text"
                  class="dropdown"
                  as="select"
                >
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
                <label for="stuPhysicalDis"
                  >Physical disabilities concern</label
                >
                <multiselect
                  v-model="values.stuPhysicalDis"
                  :options="physicalDisOptions"
                  mode="multiple"
                  :multipleLabel="displayLabels"
                />
                <ErrorMessage name="stuPhysicalDis" class="error-feedback" />
              </div>

              <br />
              <button type="button" class="btn btn-dark" @click="showPopup">
                Save Availability
              </button>
            </div>
          </div>
          <PopupModal :visible="isVisible" @close="hidePopup">
            <template v-slot:title> Contact Preference</template>
            <template v-slot:content>
              <div class="form-group">
                <label for="contactPref"
                  >Please select how would you like to be contacted?</label
                >
                <br />
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
