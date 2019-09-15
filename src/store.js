import Vue from "vue";
import Vuex from "vuex";
import { throwError } from "rxjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    loading: true,
    requestUrl: "",
    requestError: false
  },
  mutations: {
    changeLoadingStatus(state, payLoad) {
      state.loading = payLoad;
    },
    setData(state, payLoad) {
      state.data = payLoad;
    },
    sortData(state, { sort, type }) {
      function dataSort(a, b) {
        if (a[type] > b[type]) {
          return sort === "asc" ? 1 : -1;
        }
        if (a[type] == b[type]) return 0;
        if (a[type] < b[type]) {
          return sort === "asc" ? -1 : 1;
        }
      }
      state.data.sort(dataSort);
    },
    setRequestUrl(state, payLoad) {
      state.requestUrl = payLoad;
    },
    setRequestError(state, payLoad) {
      state.requestError = payLoad;
    }
  },
  actions: {
    getData: async ({ commit }) => {
      const url =
        "/search/repositories?q=stars:%3E=0&sort=stars&order=desc&page=1";
      const requestUrl = `${axios.defaults.baseURL}${url}`;
      commit("changeLoadingStatus", true);
      commit("setRequestError", false);

      try {
        let { data, status } = await axios.get(url);
        if (status === 200) {
          commit("setData", data.items);
          commit("changeLoadingStatus", false);
          commit("setRequestUrl", requestUrl);
        }
      } catch (e) {
        commit("changeLoadingStatus", false);
        commit("setRequestError", true);
        console.log(e);
      }
    }
  },
  getters: {
    loadingData: state => state.loading,
    getData: state => state.data,
    getRequestUrl: state => state.requestUrl,
    getRequestError: state => state.requestError
  }
});
