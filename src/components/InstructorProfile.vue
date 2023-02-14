<script setup lang="ts">
import { displayLabels } from "@/utils";
import { useStore } from "vuex";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

import Multiselect from "@vueform/multiselect";

import * as yup from "yup";
const schema = yup.object().shape({
  city: yup.string().required("City is required!"),
  state: yup.string().required("State is required!"),
  department: yup.string().required("Department is required!"),
  physicalDis: yup.array(),
  ageRange: yup.string().required("Age Range is required!"),
});

import { Form, Field, ErrorMessage } from "vee-validate";

const currentUser = store.state.auth.user;

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

let initialState = {
  city: "",
  state: "",
  department: "",
  physicalDis: [],
  ageRange: "",
  insType: "",
};

if (store.state.auth.user.profile) {
  initialState.city = store.state.auth.user.profile.city;
  initialState.state = store.state.auth.user.profile.state;
  initialState.department = store.state.auth.user.profile.department;
  initialState.physicalDis = JSON.parse(
    store.state.auth.user.profile.physicalDis
  );
  initialState.ageRange = store.state.auth.user.profile.ageRange;
  initialState.insType = store.state.auth.user.profile.insType;
}

const formValues = {
  city: initialState.city,
  state: initialState.state,
  department: initialState.department,
  physicalDis: initialState.physicalDis,
  ageRange: initialState.ageRange,
  insType: initialState.insType,
};

let loading = false;
let successful = false;
let message = "";

const saveProfile = (data) => {
  loading = true;
  if (data.department === "Others") data.department = data["department-text"];
  if (data.insType === "Others") data.insType = data["insType-text"];

  store.dispatch("auth/saveProfile", data).then(
    (data) => {
      console.log(data);
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

<style scoped></style>

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3 class="align-center">Instructor Profile</h3>
      <br />
      <div>
        <Form
          @submit="saveProfile"
          v-slot="{ values }"
          :validation-schema="schema"
          :initial-values="formValues"
        >
          <div class="form-group">
            <label for="city">Location of {{ currentUser.nameOrg }}</label>
            <Field
              id="city"
              name="city"
              type="text"
              class="form-control"
              placeholder="City"
            />
            <ErrorMessage name="city" class="error-feedback" />

            <region-select
              v-model="values.state"
              :region="values.state"
              class="dropdown"
              placeholder="Select State"
            />
            <ErrorMessage name="state" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="department"
              >Department in {{ currentUser.nameOrg }}</label
            >
            <Field name="department" type="text" class="dropdown" as="select">
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
              <option value="Construction Science">Construction Science</option>
              <option value="Construction Engineering and Management">
                Construction Engineering and Management
              </option>
              <option value=" Real Estate and Construction Management">
                Real Estate and Construction Management
              </option>
              <option value="Geomatics">Geomatics</option>
              <option value="Others">Others</option>
            </Field>
            <div v-if="values.department === 'Others'">
              <Field
                name="department-text"
                type="text"
                placeholder="Please Specify"
                class="form-control"
              />
            </div>
            <ErrorMessage name="department" class="error-feedback" />
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
                placeholder="Please Specify"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="physicalDis">Physical Disabilities (if any)</label>
            <multiselect
              v-model="values.physicalDis"
              :options="physicalDisOptions"
              mode="multiple"
              :multipleLabel="displayLabels"
            />
            <ErrorMessage name="physicalDis" class="error-feedback" />
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
