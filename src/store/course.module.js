const initialState = { data: null };

export const course = {
  namespaced: true,
  state: initialState,
  actions: {
    addCourse({ commit }, data) {
      commit("saveCourse", data);
      localStorage.setItem("course", JSON.stringify(data));
    },
  },
  mutations: {
    saveCourse(state, data) {
      state.data = data;
    },
  },
};
