<template>
  <div class="grid-container">
    <div class="sidebar">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <div style="text-align: center">
        {{ currentUser.firstName + " " + currentUser.lastName }}<br />
        <br />
        <router-link to="/stats">Stats</router-link><br />
        <button @click="getUsers">Users</button><br />
        <button @click="getInstructors">Instructors</button><br />
        <button @click="getCourseRequests">Course Requests</button><br />
        <button @click="getIndustryPractitioners">Industry Practitioners</button
        ><br />
        <button @click="getAvailability">Availability</button><br />
        <button @click="getUploads">Uploads</button><br />
      </div>
    </div>
    <div>
      <AdminList :list="items" :fields="fields"></AdminList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, onUpdated } from "vue";
import AdminService from "@/services/admin.service.js";
import AdminList from "@/components/admin/AdminList.vue";
import {
  UserFields,
  InstructorFields,
  IndustryPractitionerFields,
  CourseRequestFields,
  AvailabilityFields,
  UploadFields,
} from "@/types/types";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

let currentUser = store.state.auth.user;
let loading = false;
let successful = false;
let message = "";
let items = ref([]);
let fields = ref([""]);

const getUsers = () => {
  AdminService.getUsers().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = UserFields;
      // router.push("/instructorFeed");
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

const getInstructors = () => {
  AdminService.getInstructors().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = InstructorFields;
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

const getCourseRequests = () => {
  AdminService.getCourseRequests().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = CourseRequestFields;
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

const getIndustryPractitioners = () => {
  AdminService.getIndustryPractitioners().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = IndustryPractitionerFields;
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

const getAvailability = () => {
  AdminService.getAvailability().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = AvailabilityFields;
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

const getUploads = () => {
  AdminService.getUploads().then(
    (response) => {
      console.log(response.data);
      items.value = response.data;
      fields.value = UploadFields;
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
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 12em 1fr;
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

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
}

.sidebar {
  padding: 1em 0em;
  background-color: #ededed;
}

button {
  border: none;
  color: blue;
}
</style>
