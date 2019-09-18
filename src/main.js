import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store/";
import router from "./router";

//Styles
import "./assets/styles/app.sass";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
