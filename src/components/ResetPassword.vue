<template>
  <div class="min-height">
    <div class="card card-container">
      <div v-if="!successful">
        <Form @submit="handleResetPassword" :validation-schema="schema">
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              class="form-control"
            />
            <ErrorMessage name="confirmPassword" class="error-feedback" />
          </div>

          <br />
          <div class="form-group">
            <button
              class="btn btn-primary btn-block"
              style="margin-left: 22%"
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Change Password</span>
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

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { useStore } from "vuex";
const store = useStore();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

let loading = false;
let successful = false;
let message = "";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Must be at least 6 characters!")
    .max(40, "Must be maximum 40 characters!")
    .matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const handleResetPassword = (data) => {
  loading = true;
  data.token = route.params.token;
  store.dispatch("auth/resetPassword", data).then(
    (data) => {
      router.push("/Home");
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
.min-height {
  min-height: 510px !important;
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
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
