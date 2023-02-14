<script setup lang="ts">
import { displayLabels, physicalDisOptions } from "@/utils";

import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

import Multiselect from "@vueform/multiselect";

import * as yup from "yup";
const schema = yup.object().shape({
  location: yup.string().required("Location is required!"),
  physicalDis: yup.array(),
  ageRange: yup.string().required("Age Range is required!"),
});

import { Form, Field, ErrorMessage } from "vee-validate";

let currentUser = store.state.auth.user;

let initialState = {
  ageRange: "",
  department: "",
  ethnicDiv: "",
  expertise: "",
  genderDiv: "",
  levelEducation: "",
  location: "",
  organPolicy: "",
  physicalDis: [],
  position: "",
  size: "",
  type: "",
  website: "",
  yearsOfExp: "",
};

if (store.state.auth.user.profile) {
  initialState.ageRange = store.state.auth.user.profile.ageRange;
  initialState.department = store.state.auth.user.profile.department;
  initialState.ethnicDiv = store.state.auth.user.profile.ethnicDiv;
  initialState.expertise = store.state.auth.user.profile.expertise;
  initialState.genderDiv = store.state.auth.user.profile.genderDiv;
  initialState.levelEducation = store.state.auth.user.profile.levelEducation;
  initialState.location = store.state.auth.user.profile.location;
  initialState.organPolicy = store.state.auth.user.profile.organPolicy;
  initialState.physicalDis = JSON.parse(
    store.state.auth.user.profile.physicalDis
  );
  initialState.position = store.state.auth.user.profile.position;
  initialState.size = store.state.auth.user.profile.size;
  initialState.type = store.state.auth.user.profile.type;
  initialState.website = store.state.auth.user.profile.website;
  initialState.yearsOfExp = store.state.auth.user.profile.yearsOfExp;
}

const formValues = {
  ageRange: initialState.ageRange,
  department: initialState.department,
  ethnicDiv: initialState.ethnicDiv,
  expertise: initialState.expertise,
  genderDiv: initialState.genderDiv,
  levelEducation: initialState.levelEducation,
  location: initialState.location,
  organPolicy: initialState.organPolicy,
  physicalDis: initialState.physicalDis,
  position: initialState.position,
  size: initialState.size,
  type: initialState.type,
  website: initialState.website,
  yearsOfExp: initialState.yearsOfExp,
};

let loading = false;
let successful = false;
let message = "";

const saveProfile = (data) => {
  loading = true;
  store.dispatch("auth/saveIndustryProfile", data).then(
    (data) => {
      router.push({ name: "instructor-feed" });
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
</script>

<style scoped>
.card-container.card {
  max-width: 650px !important;
  padding: 40px 40px;
}
</style>

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div>
        <Form
          @submit="saveProfile"
          v-slot="{ values }"
          :validation-schema="schema"
          :initial-values="formValues"
        >
          <div class="form-group">
            <label for="location">Location of {{ currentUser.nameOrg }}</label>
            <Field
              id="location"
              name="location"
              type="text"
              class="form-control"
            />
            <ErrorMessage name="location" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="type">Type of Firm</label>
            <Field name="type" type="text" class="dropdown" as="select">
              <option value="Residential Building Construction firm">
                Residential Building Construction firm
              </option>
              <option value="Non-Residential Building Construction firm">
                Non-Residential Building Construction firm
              </option>
              <option value="Federal/Heavy Construction firm">
                Federal/Heavy Construction firm
              </option>
              <option value="Transportation and Highway Construction firm">
                Transportation and Highway Construction firm
              </option>
              <option value="Mechanical, Electrical and Plumbing (MEP) firm">
                Mechanical, Electrical and Plumbing (MEP) firm
              </option>
              <option value="Special Trade Contracting firm">
                Special Trade Contracting firm
              </option>
              <option value="Design firms">Design firms</option>
              <option value="Design-Build firm">Design-Build firm</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage name="type" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="size">Size of {{ currentUser.nameOrg }}</label>
            <Field name="size" type="text" class="dropdown" as="select">
              <option value="Less than 10 employees">
                Less than 10 employees
              </option>
              <option value="10 - 19 employees">10 - 19 employees</option>
              <option value="20 - 49 employees">20 - 49 employees</option>
              <option value="50 - 99 employees">50 - 99 employees</option>
              <option value="100 - 249 employees">100 - 249 employees</option>
              <option value="250 - 499 employees">250 - 499 employees</option>
              <option value="500 - 999 employees">500 - 999 employees</option>
              <option value="1,000+ employees">1,000+ employees</option>
            </Field>
            <ErrorMessage name="size" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="genderDiv"
              >Gender diversity of {{ currentUser.nameOrg }}</label
            >
            <Field name="genderDiv" type="text" class="dropdown" as="select">
              <option value="veryHigh">Very High</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="slightly">Slightly</option>
              <option value="notDiverseAndInclusive">
                Not diverse and inclusive
              </option>
            </Field>
            <ErrorMessage name="genderDiv" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="ethnicDiv"
              >Ethnic diversity of {{ currentUser.nameOrg }}</label
            >
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
            <label for="website">Website of {{ currentUser.nameOrg }}</label>
            <Field name="website" type="text" class="form-control" />
            <ErrorMessage name="website" class="error-feedback" />
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
            <label for="levelEducation">Level of Education</label>
            <Field
              name="levelEducation"
              type="text"
              class="dropdown"
              as="select"
            >
              <option value="diploma">Diploma</option>
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
            <label for="position">Position/Role in organization</label>
            <Field name="position" type="text" class="dropdown" as="select">
              <option value="President/CEO">President/CEO</option>
              <option value="Vice President">Vice President</option>
              <option value="Senior Manager">Senior Manager</option>
              <option value="Site Manager">Site Manager</option>
              <option value="Construction Manager">Construction Manager</option>
              <option value="Estimator">Estimator</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Field/Project Engineer">
                Field/Project Engineer
              </option>
              <option value="Civil Engineer">Civil Engineer</option>
              <option value="Structural Engineer">Structural Engineer</option>
              <option value="Mechanical Engineer">Mechanical Engineer</option>
              <option value="Electrical Engineer">Electrical Engineer</option>
              <option value="Superintendent">Superintendent</option>
              <option value="Surveyor">Surveyor</option>
              <option value="Architect">Architect</option>
              <option value="Inspector">Inspector</option>
              <option value="Health and Safety Specialist">
                Health and Safety Specialist
              </option>
              <option value="Tradesman">Tradesman</option>
              <option
                value="Mechanical, Electrical and Plumbing (MEP) Specialist"
              >
                Mechanical, Electrical and Plumbing (MEP) Specialist
              </option>
            </Field>
            <ErrorMessage name="position" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="yearsOfExp">Years of experience</label>
            <Field name="yearsOfExp" type="text" class="dropdown" as="select">
              <option value="1 - 5 year">1 - 5 years</option>
              <option value="6 - 10 years">6 - 10 years</option>
              <option value="11 - 15 years">11 - 15 years</option>
              <option value="15 – 20 years">15 – 20 years</option>
              <option value="21 – 25 years">21 – 25 years</option>
              <option value="26+ years">26+ years</option>
            </Field>
            <ErrorMessage name="yearsOfExp" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="expertise">Area of expertise</label>
            <Field name="expertise" type="text" class="dropdown" as="select">
              <option value="Construction Management">
                Construction Management
              </option>
              <option value="Health and Safety">Health and Safety</option>
              <option value="Estimating">Estimating</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Project Management">Project Management</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Structural Engineering">
                Structural Engineering
              </option>
              <option value="MEP Specialist">MEP Specialist</option>
              <option value="Architecture">Architecture</option>
              <option value="Architectural engineering">
                Architectural engineering
              </option>
              <option value="Building and Construction Inspection">
                Building and Construction Inspection
              </option>
              <option value="Site Superintendent">Site Superintendent</option>
              <option value="Site Management">Site Management</option>
              <option value="MEP works">MEP works</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Roofer">Roofer</option>
              <option value="Plumber">Plumber</option>
              <option value="Painter">Painter</option>
              <option value="Mason">Mason</option>
              <option value="Electrician">Electrician</option>
              <option value="Glazier">Glazier</option>
              <option value="Dry wall and Ceiling tile installer">
                Dry wall and Ceiling tile installer
              </option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage name="expertise" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="organPolicy"
              >Organization policy/support/resources</label
            >
            <Field name="organPolicy" type="text" class="form-control" />
            <ErrorMessage name="organPolicy" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="physicalDis">Physical disabilities (if any)</label>
            <multiselect
              v-model="values.physicalDis"
              :options="physicalDisOptions"
              mode="multiple"
              :multipleLabel="displayLabels"
            />
            <ErrorMessage name="physicalDis" class="error-feedback" />
          </div>

          <br />
          <div class="form-group align-center">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Save Profile</span>
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
