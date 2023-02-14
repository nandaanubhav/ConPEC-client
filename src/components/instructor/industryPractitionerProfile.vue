<template>
  <div
    class="grid container content-card"
    style="padding: 1em; margin-bottom: 1em"
  >
    <h2 class="align-center" style="margin-bottom: 1em">
      Industry Practitioner Details
    </h2>
    <table style="width: 100%">
      <tr>
        <td>Name</td>
        <td>
          {{
            industryPractitioner.user.firstName +
            " " +
            industryPractitioner.user.lastName
          }}
        </td>
      </tr>
      <tr>
        <td>Title</td>
        <td>{{ industryPractitioner.user.title }}</td>
      </tr>
      <tr>
        <td>Position</td>
        <td>{{ industryPractitioner.position }}</td>
      </tr>
      <tr>
        <td>Organization</td>
        <td>{{ industryPractitioner.user.nameOrg }}</td>
      </tr>
      <tr>
        <td>Size of Organization</td>
        <td>{{ industryPractitioner.size }}</td>
      </tr>

      <tr>
        <td>Gender Diversity of Organization</td>
        <td>{{ industryPractitioner.genderDiv }}</td>
      </tr>

      <tr>
        <td>Ethnic Diversity of Organization</td>
        <td>{{ industryPractitioner.ethnicDiv }}</td>
      </tr>

      <tr>
        <td>Website of Organization</td>
        <td>{{ industryPractitioner.website }}</td>
      </tr>

      <tr>
        <td>Level of Education</td>
        <td>{{ industryPractitioner.levelEducation }}</td>
      </tr>

      <tr>
        <td>Area Of specialization</td>
        <td>{{ industryPractitioner.expertise }}</td>
      </tr>

      <tr>
        <td>Location</td>
        <td>{{ industryPractitioner.location }}</td>
      </tr>

      <tr>
        <td>Years of experience</td>
        <td>{{ industryPractitioner.yearsOfExp }}</td>
      </tr>
    </table>
    <br />
    <div
      style="width: 100%"
      class="align-center"
      v-if="course.status != '10' && course.status != '20'"
    >
      <button class="btn btn-primary" @click="showPopup">
        Select Industry Practitioner
      </button>
    </div>
  </div>
  <PopupModal :visible="isVisible" @close="hidePopup">
    <template v-slot:title> Provide Course Support</template>
    <template v-slot:content>
      <div id="popup-message">
        I, {{ currentUser.firstName + " " + currentUser.lastName }} want you to
        provide the course support for ({{ course.courseRequestType }}). You can
        reach me at {{ currentUser.email }}
        <div v-if="currentUser.Phone === 'True'">
          or {{ currentUser.phoneNumber }}.
        </div>
        <div v-else>.</div>
        <br />
        <br />

        <div class="align-center">
          <button
            class="btn btn-primary"
            @click="selectIndustryPractitioner(course, industryPractitioner)"
          >
            Send to Industry Practitioner
          </button>
        </div>
      </div>
    </template>
  </PopupModal>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import PopupModal from "../PopupModal";
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
let industryPractitioner = ref([]);

const getIndustryPractitionerProfile = (industryPractitionerUserId) => {
  loading = true;
  console.log(course);
  UserService.getIndustryPractitionerProfile(industryPractitionerUserId).then(
    (response) => {
      industryPractitioner.value = response.data;
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

console.log(store.state.user.data);

if (!store.state.user.data) {
  getIndustryPractitionerProfile(course);
} else {
  console.log(store.state.user.data);
  getIndustryPractitionerProfile(store.state.user.data.id);
}

let loading = false;
let successful = false;
let message = "";

const selectIndustryPractitioner = (course, industryPractitioner) => {
  loading = true;
  console.log(course);
  console.log(industryPractitioner);
  UserService.selectIndustryPractitioner(course, industryPractitioner).then(
    (response) => {
      console.log(response.data);
      let el = document.getElementById("popup-message");
      if (el != null) el.innerHTML = "Message sent successfully";
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
