import Home from "../pages/Home.vue";
import Opere from "../pages/Opere.vue";

const routes = [
  { path: "", name: "home", component: Home, props: true },
  { path: "/opere", name: "opere", component: Opere, props: true },


  
];

export default routes;
