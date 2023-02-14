import { createStore } from "vuex";
import { auth } from "./auth.module";
import { user } from "./user.module";
import { course } from "./course.module";

const store = createStore({
  modules: {
    auth,
    user,
    course,
  },
});

export default store;
