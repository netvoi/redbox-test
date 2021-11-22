const getters = {
  getData: (state) => state.data,
};

const actions = {
  setData({ commit }, data) {
    commit('setFormData', { data });
  },
  resetData({ commit }) {
    commit('resetFormData');
  },
};

const mutations = {
  setFormData(state, { data }) {
    state.data = data;
  },
  resetFormData(state) {
    state.data = {};
  },
};

const state = () => ({
  data: {},
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
