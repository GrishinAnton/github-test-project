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
      page: 1
    },
    pagination: {
      maxTotalCount: null,
      perPageCount: null,
      currentPage: null
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
    },
    setPagination(state, payLoad) {
      state.pagination = Object.assign(state.pagination, payLoad);
    }
  },
  actions: {
    getData: async ({ getters, commit }, sortParams = {}) => {
      //search
      const url = "/search/repositories";

      await commit("setSortParams", sortParams);
      let getSortParams = getters["getSortParams"];

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
        let { data, status, request } = await Api.getData(url, params);

        if (status === 200) {
          commit("setData", data.items);
          commit("changeLoadingStatus", false);
          commit("setRequestUrl", request.responseURL);
          commit("setPagination", {
            currentPage: getSortParams.page,
            maxTotalCount: data.total_count > 986 ? 986 : data.total_count,
            perPageCount: data.items.length <= 30 ? data.items.length : 30
          });
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
    getSortParams: state => state.sortParams,
    getPagination: state => state.pagination
  }
};
