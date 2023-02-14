<template>
  <h2 class="align-center" style="margin: 0.9em">View Resources</h2>
  <h3 style="margin: 1em">Pictures</h3>
  <div v-if="uploadList.length === 0">
    <h5 style="margin: 1em" class="align-center">No Pictures Uploaded Yet</h5>
  </div>
  <div v-else>
    <ul>
      <li v-for="item in uploadList" :key="item.id">
        <img
          :src="websiteURL + item.filePath.substring(9)"
          :alt="item.file"
          class="book-image"
          style="height: 100px; width: 150px"
        />
        {{ item.description.substring(0, 21) }}
      </li>
    </ul>
  </div>
  <h3 style="margin: 1em">Videos</h3>
  <div v-if="uploadVideoList.length === 0">
    <h5 style="margin: 1em" class="align-center">No Videos Uploaded Yet</h5>
  </div>
  <div v-else>
    <ul>
      <li v-for="item in uploadVideoList" :key="item.id">
        <iframe
          class="embed-responsive-item"
          :src="websiteURL + item.filePath.substring(9)"
          style="height: 101%"
          allowfullscreen
        ></iframe>
        <div class="align-center">
          {{ item.description.substring(0, 40) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { UploadItem } from "@/types/types";
import UserService from "@/services/user.service";
import { ref } from "vue";
import { websiteURL } from "@/utils";

const content = ref([]);

let uploadList = ref([]);
let uploadVideoList = ref([]);

const getUploads = () => {
  UserService.getUploads().then(
    (response) => {
      content.value = response.data;
      uploadList.value = response.data.filter(
        (el) => el.type === "Project pictures"
      );
      uploadVideoList.value = response.data.filter((el) => el.type === "Video");
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
getUploads();
</script>

<style scoped>
ul > li {
  display: inline-block;
  margin: 1em;
  /* You can also add some margins here to make it look prettier */
}
</style>
