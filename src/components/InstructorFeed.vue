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
        {{ currentUser.title }}<br />
        {{ currentUser.profile.department }} <br />
        {{ currentUser.nameOrg }} <br />
        {{ currentUser.profile.location }}

        <br /><br />
        <router-link :to="{ name: 'instructor-profile' }">
          <button class="btn btn-secondary btn-block">Update Profile</button>
        </router-link>
        <br /><br />
        <button class="btn btn-secondary btn-block" @click="raiseCourseRequest">
          Raise Course Support
        </button>
        <br /><br />
        <router-link
          :to="{ name: 'instructor-view-resources' }"
          class="nav-link"
        >
          <button class="btn btn-secondary btn-block">View Resources</button>
        </router-link>
      </div>
    </div>
    <div v-if="content.length > 0">
      <ul>
        <li v-for="(course, index) in content" :key="course.id">
          <div class="content-card">
            <p>
              Course Support Type: {{ course.courseRequestType }}
              <span
                title="A notification has been sent to the selected industry practitioner"
              >
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  style="color: #0bda51; font-size: large"
                  v-if="course.status == '10' || course.status == '20'"
                />
              </span>
              <br />
              Course Requested On :
              {{ new Date(course.createdAt).toDateString() }}
            </p>
            <div
              v-if="course.status !== '10' && course.status !== '20'"
              class="button-container"
            >
              <div class="padding-10">
                <button
                  class="btn btn-primary"
                  @click="updateCourseRequest(course)"
                >
                  Update
                </button>
              </div>
              <div class="padding-10">
                <button
                  class="btn btn-danger"
                  @click="deleteCourseRequest(course)"
                >
                  Delete
                </button>
              </div>
              <div class="padding-10">
                <button
                  class="btn btn-primary collapsible"
                  :id="'recommendation_' + index"
                  @click="viewRecommendations(course)"
                >
                  View Recommendations
                </button>
              </div>
            </div>
            <div v-else>
              <div>
                <button
                  class="btn btn-primary"
                  @click="viewSelectedIndustryPractitioner(course)"
                >
                  View Industry Practitioner
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <h1 style="text-align: center">No Course Support Request Raised.</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, onUpdated } from "vue";
import UserService from "../services/user.service.js";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

let currentUser = store.state.auth.user;
let loading = false;
let successful = false;
let message = "";

onUpdated(() => {
  // text content should be the same as current `count.value`
  var coll = document.getElementsByClassName("collapsible");
  var colContent = document.getElementsByClassName("content");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function (event) {
      let el = event.target;
      if (el != null) {
        let index = el.id.split("_")[1];
        var content = document.getElementById("content_" + index);
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = "120px";
        }
      }
      // this.classList.toggle("active");
      // let index;
      // for (index = 0; index < coll.length; index++) {
      //   if (coll[index].classList.contains("active")) break;
      // }
      // console.log(index);
      // var content = this.nextElementSibling;
      // if (content.style.maxHeight) {
      //   content.style.maxHeight = null;
      // } else {
      //   content.style.maxHeight = "120px";
      // }
    });
  }
});

const content = ref([]);

const getCourseRequest = () => {
  UserService.getInstructorBoard().then(
    (response) => {
      console.log(response.data);
      content.value = response.data;
    },
    (error) => {
      content.value =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
};

getCourseRequest();

const deleteCourseRequest = (course) => {
  console.log(course.courseRequestType);
  loading = true;
  UserService.deleteCourseRequest(course).then(
    (response) => {
      console.log(response);
      if (response.status == "200") {
        getCourseRequest();
      } else {
        alert("Failure");
      }
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

const raiseCourseRequest = () => {
  store.state.user.course = null;
  router.push({ name: "course-request" });
};

const updateCourseRequest = (course) => {
  store.state.user.course = course;
  router.push({ name: "update-course-request" });
};

const viewSelectedIndustryPractitioner = (course) => {
  store.dispatch("user/addCourse", course);
  store.state.course.data = null;
  router.push({ name: "view-industry-practitioner-ins" });
};

const viewRecommendations = (course) => {
  store.dispatch("user/addCourse", course);
  router.push({ name: "view-recommendations" });
};
</script>

<style scoped>
.grid-container {
  padding: 1em 0em;
  display: grid;
  grid-template-columns: minmax(8em, 12em) 1fr;
  column-gap: 2em;
  min-height: calc(100vh - 122px);
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

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}
</style>
