import Api from "../../utils/api";

export default {
  namespaced: true,
  state: {
    data: [],
    loading: true,
    requestUrl: "",
    requestError: false,
    sortParams: {
      q: "stars:>=0",
      sort: "stars",
      order: "desc",
      page: "1"
    }
  },
  mutations: {
    changeLoadingStatus(state, payLoad) {
      state.loading = payLoad;
    },
    setData(state, payLoad) {
      state.data = payLoad;
    },
    setRequestUrl(state, payLoad) {
      state.requestUrl = payLoad;
    },
    setRequestError(state, payLoad) {
      state.requestError = payLoad;
    },
    setSortParams(state, payLoad) {
      state.sortParams = Object.assign(state.sortParams, payLoad);
    }
  },
  actions: {
    getData: async ({ getters, commit }, sortParams = {}) => {
      //search
      const url = "/search/repositories";

      await commit("setSortParams", sortParams);
      let getSortParams = getters["getSortParams"];

      //TODO переделать формирование урла для tooltip
      const requestUrl = `${axios.defaults.baseURL}${url}`;

      commit("changeLoadingStatus", true);
      commit("setRequestError", false);

      const q = getSortParams.q ? getSortParams.q : "stars:>=0",
        sort = getSortParams.sort,
        order = getSortParams.order,
        page = getSortParams.page;

      let params = {
        q,
        sort,
        order,
        page
      };

      try {
        let { data, status } = await Api.getData(url, params);
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
    getRequestError: state => state.requestError,
    getSortParams: state => state.sortParams
  }
};
