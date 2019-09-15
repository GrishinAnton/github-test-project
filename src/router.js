import Vue from "vue";
import Router from "vue-router";
import Auth from "./components/Auth/Auth";
import Repos from "./components/Repos/Repos";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Auth",
      component: Auth
    },
    {
      path: "/repos",
      name: "Repos",
      component: Repos
    }
  ]
});
