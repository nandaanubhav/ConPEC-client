<template>
  <div
    class="grid container content-card"
    style="padding: 1em; margin-bottom: 1em"
  >
    <h2 class="align-center" style="margin-bottom: 1em">
      Course Support Request Details
    </h2>
    <table style="width: 100%">
      <tr>
        <td>Course Request Type</td>
        <td>
          {{ course.courseRequestType }}
        </td>
      </tr>
      <tr>
        <td>Instruction Delivery Type</td>
        <td>
          {{ course.insDeliveryType }}
        </td>
      </tr>
      <tr>
        <td>Class Size</td>
        <td>{{ course.classSize }}</td>
      </tr>
      <tr>
        <td>Academic Level</td>
        <td>{{ course.academicLevel }}</td>
      </tr>
      <tr>
        <td>studentDept</td>
        <td>{{ course.studentDept }}</td>
      </tr>

      <tr>
        <td>Gender proportion of students (Male : Female : Others)</td>
        <td>{{ course.genderProp }}</td>
      </tr>

      <tr>
        <td>Ethnic Diversity of students</td>
        <td>{{ course.ethnicDiv }}</td>
      </tr>

      <tr>
        <td>When the course support is needed</td>
        <td>
          {{
            new Date(course.date).toDateString() +
            " @ " +
            JSON.parse(course.time).hours
          }}:{{ JSON.parse(course.time).minutes }}
        </td>
      </tr>

      <tr>
        <td>Duration of course support</td>
        <td>{{ course.duration }}</td>
      </tr>

      <tr>
        <td>Number/Frequency of Course Support</td>
        <td>{{ course.noOfFreq }}</td>
      </tr>

      <tr>
        <td>Topic</td>
        <td>{{ course.topic }}</td>
      </tr>

      <tr>
        <td>Learning objective/Expected Outcome</td>
        <td>{{ course.learning }}</td>
      </tr>

      <tr>
        <td>Need for Pre-Visit by the instructor</td>
        <td>{{ course.needForPreVisit }}</td>
      </tr>

      <tr v-if="showVisualRep(course.courseRequestType)">
        <td>Specific demonstrations/ Visual Representation Required</td>
        <td>{{ course.visualRep }}</td>
      </tr>

      <tr v-if="course.courseRequestType === 'Site Visit'">
        <td>Need to visit the office trailer/site office</td>
        <td>{{ course.siteOffice }}</td>
      </tr>

      <tr v-if="showIndusSupportSize(course.courseRequestType)">
        <td>Size of industry-support team required by the instructor</td>
        <td>{{ course.indusSupportSize }}</td>
      </tr>
    </table>
    <br />
    <div style="width: 100%" class="align-center">
      <button
        class="btn btn-primary"
        @click="showPopup"
        v-if="course.status !== '10' && course.status !== '20'"
      >
        Respond to Request
      </button>
      <br /><br />
      <router-link :to="{ name: 'view-instructor-profile' }">
        <button class="btn btn-primary">View Instructor's Profile</button>
      </router-link>
    </div>
  </div>
  <PopupModal :visible="isVisible" @close="hidePopup">
    <template v-slot:title> Provide Course Support</template>
    <template v-slot:content>
      I, {{ currentUser.firstName + " " + currentUser.lastName }} is willing to
      provide the course support ({{ course.courseRequestType }}) you requested.
      You can reach me at {{ currentUser.email }}
      <div v-if="currentUser.Phone === 'True'">
        or {{ currentUser.phoneNumber }}.
      </div>
      <div v-else>.</div>
      <br />
      <br />

      <div class="align-center">
        <button class="btn btn-primary" @click="selectCourse(course)">
          Send Reply to Instructor
        </button>
      </div>
    </template>
  </PopupModal>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import PopupModal from "../components/PopupModal";
import UserService from "@/services/user.service";

const store = useStore();

let isVisible = ref(false);

const showPopup = () => {
  isVisible.value = true;
};

const hidePopup = () => {
  isVisible.value = false;
};

const currentUser = store.state.auth.user;
let course = store.state.user.course;
let loading = false;
let successful = false;
let message = "";

const selectCourse = (course) => {
  console.log(course);
  console.log(course.id);
  UserService.selectCourse(course).then(
    (response) => {
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
