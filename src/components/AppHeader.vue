<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div v-if="currentUser" class="navbar-nav ml-auto grid-logged-in-header">
      <li v-if="currentUser.roles == 'INSTRUCTOR'" class="nav-item">
        <router-link :to="{ name: 'instructor-feed' }" class="nav-link">
          <font-awesome-icon
            icon="fa-solid fa-house"
            style="color: white; margin: 0.2em 0.2em 0.2em 0.6em"
          />
          <span class="header-text">Home</span>
        </router-link>
      </li>
      <li
        v-else-if="currentUser.roles == 'INDUSTRYPRACTITIONER'"
        class="nav-item"
      >
        <router-link
          :to="{ name: 'industry-practitioner-feed' }"
          class="nav-link"
        >
          <font-awesome-icon
            icon="fa-solid fa-house"
            style="color: white; margin: 0.2em 0.2em 0.2em 0.6em"
          />
          <span class="header-text">Home</span>
        </router-link>
      </li>
      <li v-else-if="currentUser.roles == 'ADMIN'" class="nav-item">
        <router-link :to="{ name: 'admin-feed' }" class="nav-link">
          <font-awesome-icon
            icon="fa-solid fa-house"
            style="color: white; margin: 0.2em 0.2em 0.2em 0.6em"
          />
          <span class="header-text">Home</span>
        </router-link>
      </li>
      <li v-else class="nav-item">
        <router-link to="/profile" class="nav-link"> Home </router-link>
      </li>
      <li v-if="currentUser.roles == 'INDUSTRYPRACTITIONER'" class="nav-item">
        <router-link
          :to="{ name: 'industry-practitioner-view-uploads' }"
          class="nav-link"
        >
          <font-awesome-icon
            icon="fa-solid fa-upload"
            style="color: white; margin: 0.2em 0.2em 0.2em 0.6em"
          />
          <span class="header-text">Uploads</span>
        </router-link>
      </li>
      <li v-else class="nav-item"></li>
      <li class="nav-item"></li>
      <l1></l1>
      <li class="nav-item">
        <a @click.prevent="logOut" style="cursor: pointer" class="nav-link">
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
            style="color: white; font-size: larger"
          />
          <span class="header-text">Log Out</span>
        </a>
      </li>
    </div>
    <div v-else class="navbar-nav ml-auto grid-header">
      <li class="nav-item">
        <router-link to="/home" class="nav-link">
          <font-awesome-icon
            icon="fa-solid fa-house"
            style="color: white; margin: 0.2em 0.2em 0.2em 0.6em"
          />
          <span class="header-text">Home</span>
        </router-link>
      </li>
      <li class="nav-item"></li>
      <li class="nav-item"></li>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.grid-header {
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
}

.grid-logged-in-header {
  width: 100%;
  display: grid;
  grid-template-columns: 100px 120px 240px 1fr 100px;
}

.header-text {
  vertical-align: top;
  margin-left: 0.3em;
  color: white;
}
</style>
