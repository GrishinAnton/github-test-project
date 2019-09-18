const Api = {
  getData: params => {
    return axios.get(params);
  }
};

export default Api;
