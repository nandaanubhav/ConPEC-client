<template>
  <div
    class="grid container content-card"
    style="padding: 1em; margin-bottom: 1em"
  >
    <h2 class="align-center" style="margin-bottom: 1em">Instructor Details</h2>
    <table style="width: 100%">
      <tr>
        <td>Name</td>
        <td>
          {{ instructor.user.firstName + " " + instructor.user.lastName }}
        </td>
      </tr>
      <tr>
        <td>Title</td>
        <td>{{ instructor.user.title }}</td>
      </tr>
      <tr>
        <td>Department</td>
        <td>{{ instructor.department }}</td>
      </tr>
      <tr>
        <td>Institute</td>
        <td>{{ instructor.user.nameOrg }}</td>
      </tr>
      <tr>
        <td>Type of Institute</td>
        <td>{{ instructor.insType }}</td>
      </tr>

      <tr>
        <td>Location of Institute</td>
        <td>{{ instructor.location }}</td>
      </tr>

      <tr>
        <td>Physical Disabilities(if any)</td>
        <td>{{ JSON.parse(instructor.physicalDis).join(", ") }}</td>
      </tr>

      <tr>
        <td>Age Range</td>
        <td>{{ instructor.ageRange }}</td>
      </tr>

      <tr>
        <td>Ethnicity</td>
        <td>{{ instructor.user.ethnicity }}</td>
      </tr>

      <tr>
        <td>Gender</td>
        <td>{{ instructor.user.gender }}</td>
      </tr>

      <tr>
        <td>Course Request Type</td>
        <td>{{ course.courseRequestType }}</td>
      </tr>
    </table>
    <br />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import PopupModal from "../PopupModal";
import UserService from "@/services/user.service";

const store = useStore();

const currentUser = store.state.auth.user;
let course = store.state.user.course;
let instructor = ref([]);

const getInstructorProfile = (instructorUserId) => {
  loading = true;
  console.log("inside getInstructorProfile");
  console.log(course);
  UserService.getIndustryPractitionerProfile(instructorUserId).then(
    (response) => {
      instructor.value = response.data;
      console.log(response.data);
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

getInstructorProfile(course.userId);

let loading = false;
let successful = false;
let message = "";
</script>

<style scoped>
td:nth-child(1) {
  text-align: right;
  padding-right: 2em;
  width: 50%;
}

td:nth-child(2) {
  text-align: left;
  padding-left: 2em;
  width: 50%;
}
</style>
