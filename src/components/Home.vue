<template>
  <div class="col-md-12" style="min-height: calc(100vh - 230px)">
    <img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="profile-img-card"
    />
    <h1 style="text-align: center">
      CONPEC
      <sup style="font-size: xx-small; top: -2.5em">TM</sup>
    </h1>
    <p style="text-align: center">
      ...connecting professional and educational communities for future
      workforce development
    </p>
    <div class="card card-container">
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Email</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <br />
        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            style="margin-left: 40%"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
          <br /><br />
          <div style="width: 100%; color: #1a73e8" class="align-center">
            <router-link to="/forgotPassword" class="nav-link">
              <span>Forgot Password?</span>
            </router-link>
          </div>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
    <div style="text-align: center">
      Are You New Here?
      <br />
      <button
        class="btn btn-primary btn-block"
        style="margin: 10px 0px"
        :disabled="loading"
      >
        <router-link to="/register" class="nav-link"> Sign Up </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
const { setFieldValue } = useForm();

export default {
  name: "Home",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .email("Please Enter a valid email address")
        .required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.roles === "INSTRUCTOR") {
        this.$router.push({ name: "instructor-feed" });
      } else if (user.roles === "INDUSTRYPRACTITIONER") {
        this.$router.push({ name: "industry-practitioner-feed" });
      } else this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          console.log(this.$store.state.auth.user);
          if (this.$store.state.auth.user.roles === "INSTRUCTOR")
            if (this.$store.state.auth.user.profile)
              this.$router.push({ name: "instructor-feed" });
            else this.$router.push({ name: "instructor-profile" });
          else if (this.$store.state.auth.user.roles === "INDUSTRYPRACTITIONER")
            if (this.$store.state.auth.user.profile)
              this.$router.push({ name: "industry-practitioner-feed" });
            else this.$router.push({ name: "industry-practitioner-profile" });
          else if (this.$store.state.auth.user.roles === "ADMIN")
            this.$router.push({ name: "admin-feed" });
          else this.$router.push("/home");
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
label {
  display: block;
  margin-top: 10px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 40px auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 10px auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
