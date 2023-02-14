<script setup lang="ts"></script>

<style scoped>
footer {
  background: var(--secondary-background-color);
  display: flex;
  gap: 1em;
  justify-content: space-between;
}

.links,
.social-media-icons {
  display: flex;
  flex-direction: row;
}

.social-media-icons {
  text-align: center;
  gap: 0.25em;
}

.social-media-links {
  color: white;
  margin-top: 1.5em;
  margin-left: 1em;
  text-decoration: none;
}

.copyright {
  color: white;
  margin-top: 1.5em;
  margin-left: 1em;
  text-decoration: none;
}

.social-media-button {
  padding: 0;
  margin-top: 0.8em;
  margin-left: 1em;
  color: white;
  background-color: var(--secondary-background-color);
  font-size: x-large;
}
</style>

<template>
  <footer class="footer">
    <section class="social-media-icons">
      <router-link to="/" class="button social-media-button"
        ><font-awesome-icon icon="fa-brands fa-instagram" />
      </router-link>
      <router-link to="/" class="button social-media-button"
        ><font-awesome-icon icon="fa-brands fa-facebook"
      /></router-link>
      <router-link to="/" class="button social-media-button"
        ><font-awesome-icon icon="fa-brands fa-twitter"
      /></router-link>
    </section>
    <section class="links"></section>
    <section class="copyright">
      <div>
        <p>
          <router-link
            to="/"
            style="color: white; text-decoration: none; padding-right: 10px"
          >
            www.conpec.org
            <font-awesome-icon icon="fa-regular fa-copyright" /> 2022
          </router-link>
        </p>
      </div>
    </section>
  </footer>
</template>
