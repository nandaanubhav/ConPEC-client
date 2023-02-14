<template>
  <div class="min-height">
    <div class="card card-container">
      <h5 class="align-center">Account recovery</h5>
      <div class="align-center">
        Please enter the email address for which you want to reset your password
      </div>
      <Form @submit="handleForgotPassword" :validation-schema="schema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <br />
        <div class="form-group align-center">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Send Password Reset Link</span>
          </button>
        </div>
      </Form>
      <br />
      <div
        v-if="message"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ForgotPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Username is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleForgotPassword(data) {
      this.loading = true;
      this.$store.dispatch("auth/forgotPassword", data).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.min-height {
  min-height: 510px !important;
}
</style>
