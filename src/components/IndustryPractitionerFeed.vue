<script setup lang="ts">
import { useStore } from "vuex";
import { ref, onUpdated } from "vue";
import UserService from "../services/user.service.js";
import PopupModal from "../components/PopupModal";

const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

let currentUser = store.state.auth.user;
let loading = false;
let successful = false;
let message = "";

const content = ref([]);
const notificaitons = ref([]);

const getAvailability = () => {
  console.log("Inside getAvailability");
  UserService.getAvailability().then(
    (response) => {
      store.state.user.course = response.data;
      // console.log(response.data);
      router.push({ name: "industry-practitioner-availability" });
    },
    (error) => {
      let res =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(res);
    }
  );
};

const viewCourseSupport = () => {
  UserService.getInstructorBoard().then(
    (response) => {
      console.log(response.data);
      content.value = response.data;
      console.log(content.value);
    },
    (error) => {
      let res =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(res);
    }
  );
};

const viewNotifications = () => {
  UserService.getNotifications().then(
    (response) => {
      console.log("viewNotifications");
      notificaitons.value = response.data;
      console.log(response.data);
    },
    (error) => {
      let res =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(res);
    }
  );
};

viewNotifications();

const viewCourseRequest = (course) => {
  store.dispatch("user/addCourse", course);
  router.push({ name: "view-course-request" });
};

viewCourseSupport();

let isVisible = ref(false);

const showPopup = () => {
  isVisible.value = true;
};

const hidePopup = () => {
  isVisible.value = false;
};
</script>

<style scoped>
.grid-container {
  padding: 1em 0em;
  display: grid;
  grid-template-columns: minmax(8em, 16em) 1fr;
  column-gap: 2em;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.padding-10 {
  padding: 10px 10px;
}

.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  margin-top: 1.5em;
  padding: 18px;
  width: 95%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active,
.collapsible:hover {
  background-color: #555;
}

.collapsible:after {
  content: "\002B";
  color: white;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.content {
  padding: 0 18px;
  max-height: 0;
  width: 95%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 10fr 1fr 1fr;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
</style>

<template>
  <div class="grid-container">
    <div>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <div style="text-align: center">
        {{ currentUser.firstName + " " + currentUser.lastName }}<br />
        {{ currentUser.profile.position }}<br />
        {{ currentUser.nameOrg }} <br />
        {{ currentUser.profile.location }}
        <br /><br />
        <router-link :to="{ name: 'industry-practitioner-profile' }">
          <button class="btn btn-secondary btn-block">Update Profile</button>
        </router-link>
        <br /><br />
        <button class="btn btn-primary btn-block" @click="getAvailability()">
          Select Availability
        </button>
        <br />
        <span v-if="currentUser.profile.courseRequestType != null">
          {{ JSON.parse(currentUser.profile.courseRequestType).join(", ") }}
        </span>
        <br /><br />
        <router-link :to="{ name: 'industry-practitioner-upload' }">
          <button class="btn btn-dark btn-block">Upload Project Details</button>
        </router-link>
        <br /><br />
        <button class="btn btn-info" @click="showPopup">
          View Notifications <span> {{ notificaitons.length }}</span>
        </button>
      </div>
    </div>
    <div v-if="content.length > 0">
      <ul>
        <li v-for="course in content" :key="course.id">
          <div class="content-card">
            <div>
              Course Support Type: {{ course.courseRequestType }}
              <br />
              Course Requested For :
              {{ new Date(course.date).toDateString() }} @
              {{ JSON.parse(course.time).hours }}:{{
                JSON.parse(course.time).minutes
              }}<br />
              Professor :
              {{
                course.user.title +
                " " +
                course.user.firstName +
                " " +
                course.user.lastName
              }}
              <br />
              Institute: {{ course.user.nameOrg }}
            </div>
            <div class="padding-10">
              <button
                class="btn btn-primary"
                @click="viewCourseRequest(course)"
              >
                View Details
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <PopupModal :visible="isVisible" @close="hidePopup">
    <template v-slot:title> Notifications</template>
    <template v-slot:content>
      <ul>
        <li v-for="notification in notificaitons" :key="notification.id">
          {{
            notification.user.title +
            " " +
            notification.user.firstName +
            " " +
            notification.user.lastName
          }}
          at {{ notification.user.nameOrg }} is requesting that you provide a
          {{ notification.courseRequestType }} session
          <button
            class="btn btn-primary"
            style="margin-left: 1em; padding: 0"
            @click="viewCourseRequest(notification)"
          >
            View Details
          </button>
          <br />
        </li>
      </ul>
    </template>
  </PopupModal>
</template>
