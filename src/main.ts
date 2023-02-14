import { createApp } from "vue";
import "@/assets/css/global.css"; // imports the global CSS before all other CSS files
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vueCountryRegionSelect from "vue3-country-region-select";

import { BootstrapVue3 } from "bootstrap-vue-3";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

// Make BootstrapVue available throughout your project

import {
  faAddressCard,
  faDiamondTurnRight,
  faXmark,
  faCheckCircle,
  faHouse,
  faRightFromBracket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

library.add(
  faAddressCard,
  faDiamondTurnRight,
  faTwitter,
  faInstagram,
  faFacebook,
  faCopyright,
  faXmark,
  faCheckCircle,
  faHouse,
  faRightFromBracket,
  faUpload
);

createApp(App)
  .use(router)
  .use(store)
  .use(vueCountryRegionSelect)
  .use(BootstrapVue3)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
