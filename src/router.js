import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import ForgotPassword from "@/components/ForgotPassword";
import ResetPassword from "@/components/ResetPassword";
import InstructorProfile from "@/components/InstructorProfile.vue";
import IndustryPractionerProfile from "@/components/IndustryPractionerProfile.vue";
import IndustryPractitionerFeed from "@/components/IndustryPractitionerFeed.vue";
import IndustryPractitionerAvail from "@/components/IndustryPractitionerAvail.vue";
import IndustryPractitionerUpload from "@/components/IndustryPractitionerUpload.vue";
import IndustryPractitionerViewUploads from "@/components/IndustryPractitionerViewUploads.vue";

import CourseRequest from "@/components/CourseRequest.vue";
import viewCourseDetails from "@/components/viewCourseDetails.vue";
import UpdateCourseRequest from "@/components/UpdateCourseRequest.vue";
import instructorProfile from "@/components/industryPractitioner/instructorProfile.vue";

import InstructorFeed from "@/components/InstructorFeed";
import InstructorResources from "@/components/instructor/InstructorResources.vue";
import industryPractitionerProfile from "@/components/instructor/industryPractitionerProfile.vue";
import ViewRecommendations from "@/components/instructor/ViewRecommendations.vue";

import AdminFeed from "@/components/admin/AdminFeed.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    alias: ["/home", "/index.html"],
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/resetPassword/:token",
    name: "reset-password",
    component: ResetPassword,
    props: true,
  },
  {
    path: "/instructor/profile",
    name: "instructor-profile",
    // lazy-loaded
    component: InstructorProfile,
  },
  {
    path: "/practitioner/profile",
    name: "industry-practitioner-profile",
    component: IndustryPractionerProfile,
  },
  {
    path: "/practitioner/availability",
    name: "industry-practitioner-availability",
    component: IndustryPractitionerAvail,
  },

  {
    path: "/practitioner/upload",
    name: "industry-practitioner-upload",
    component: IndustryPractitionerUpload,
  },

  {
    path: "/instructor/course",
    name: "course-request",
    // lazy-loaded
    component: CourseRequest,
    props: true,
  },
  {
    path: "/practitioner/course",
    name: "view-course-request",
    component: viewCourseDetails,
    props: true,
  },
  {
    path: "/instructor/practitioner/profile",
    name: "view-industry-practitioner-ins",
    component: industryPractitionerProfile,
    props: true,
  },
  {
    path: "/practitioner/instructor/profile",
    name: "view-instructor-profile",
    component: instructorProfile,
    props: true,
  },

  {
    path: "/instructor/recommendations",
    name: "view-recommendations",
    component: ViewRecommendations,
  },

  {
    path: "/instructor/course/update",
    name: "update-course-request",
    // lazy-loaded
    component: UpdateCourseRequest,
    props: true,
  },
  {
    path: "/instructor/home",
    name: "instructor-feed",
    // lazy-loaded
    component: InstructorFeed,
  },
  {
    path: "/practitioner/home",
    name: "industry-practitioner-feed",
    // lazy-loaded
    component: IndustryPractitionerFeed,
  },
  {
    path: "/admin/home",
    name: "admin-feed",
    // lazy-loaded
    component: AdminFeed,
  },
  {
    path: "/practitioner/uploads",
    name: "industry-practitioner-view-uploads",
    // lazy-loaded
    component: IndustryPractitionerViewUploads,
  },
  {
    path: "/instructor/uploads",
    name: "instructor-view-resources",
    // lazy-loaded
    component: InstructorResources,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/register",
    "/home",
    "/forgotPassword",
    "/resetPassword/:token",
  ];

  const profilePages = ["/instructor/profile", "/practitioner/profile"];
  const instructorPageRequest = to.path.startsWith("/instructor");
  const practitionerPageRequest = to.path.startsWith("/practitioner");
  const authRequired = !publicPages.includes(to.path);
  const profilePage = profilePages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem("user"));

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/home");
  } else if (
    authRequired &&
    !profilePage &&
    loggedIn &&
    loggedIn.profile == null &&
    (loggedIn.roles === "INSTRUCTOR" ||
      loggedIn.roles === "INDUSTRYPRACTITIONER")
  ) {
    if (loggedIn.roles === "INSTRUCTOR") {
      console.log("Inside If");
      next("/instructor/profile");
    } else {
      next("/practitioner/profile");
    }
  } else if (instructorPageRequest && loggedIn.roles !== "INSTRUCTOR") {
    next("/home");
  } else if (
    practitionerPageRequest &&
    loggedIn.roles !== "INDUSTRYPRACTITIONER"
  ) {
    next("/home");
  } else {
    console.log("Inside else");
    next();
  }
});

export default router;
