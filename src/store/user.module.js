const course = JSON.parse(localStorage.getItem("course"));
const data = JSON.parse(localStorage.getItem("data"));
const initialState =
  course || data ? { course, data } : { course: null, data: null };

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    addCourse({ commit }, data) {
      commit("saveCourse", data);
      localStorage.setItem("course", JSON.stringify(data));
    },
    addData({ commit }, data) {
      commit("saveData", data);
      localStorage.setItem("data", JSON.stringify(data));
    },
  },
  mutations: {
    saveCourse(state, data) {
      state.course = data;
    },
    saveData(state, data) {
      state.data = data;
    },
  },
};
