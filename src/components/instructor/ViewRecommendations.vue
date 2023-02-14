<template>
  <div class="content">
    <h2 class="align-center padding-10">View Recommendations</h2>
    <div class="padding-10">
      <div v-if="recommendations.length > 0">
        <ul>
          <li
            v-for="recommendation in recommendations"
            :key="recommendation.id"
            class="recommendation-list"
          >
            <div>
              <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="recommendation-img-card"
              />
            </div>
            <div>
              {{
                recommendation.title +
                " " +
                recommendation.firstName +
                " " +
                recommendation.lastName +
                ", " +
                recommendation.position +
                " at " +
                recommendation.nameOrg +
                ", " +
                recommendation.location
              }}
              <br />
              Years of experience: {{ recommendation.yearsOfExp }}
              <br />
              Area of specialization: {{ recommendation.expertise }}
            </div>
            <div>
              <button
                class="btn btn-primary"
                @click="viewIndustryPractitioner(course, recommendation)"
              >
                View Details
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import UserService from "../../services/user.service.js";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

let currentUser = store.state.auth.user;
let loading = false;
let successful = false;
let message = "";

const course = store.state.user.course;

const recommendations = ref([]);

const getRecommendations = (course) => {
  loading = true;
  UserService.getRecommendations(course).then(
    (response) => {
      recommendations.value = response.data;
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

getRecommendations(course);

const viewIndustryPractitioner = (course, practitioner) => {
  store.dispatch("user/addData", practitioner);
  router.push({ name: "view-industry-practitioner-ins" });
};
</script>

<style scoped>
.recommendation-list {
  display: grid;
  grid-template-columns: 1.5fr 10fr 4fr;
}

.recommendation-img-card {
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  display: block;
}
</style>
