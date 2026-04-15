import Home from "../components/firstMenu.vue";
import Mappa from "../components/fullMap.vue";
import fullVideo from "../components/fullVideo.vue";

const routes = [
  { path: "/", redirect: "/it" },

  { path: "/:lingua", name: "home", component: Home, props: true },
  { path: "/:lingua/mappa", name: "mappa", component: Mappa, props: true },
  { path: "/:lingua/video", name: "video", component: fullVideo, props: true },


  
];

export default routes;
