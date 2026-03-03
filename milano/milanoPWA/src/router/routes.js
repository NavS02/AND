import Home from "../pages/Home.vue";
import ListOpere from "../pages/ListOpere.vue";
import ListItems from "../pages/ListItems.vue";
import MainLayout from "../pages/MainLayout.vue";
import InfoItem from "../pages/InfoItem.vue";
import Map from "../pages/Map.vue";
import TouchScreen from "../pages/TouchScreen.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "home", component: Home, props: true },
      { path: "/opere", name: "ListOpere", component: ListOpere, props: true },
      {
        path: "/opere/:items",
        name: "ListItems",
        component: ListItems,
        props: true,
      },
      { path: "/map/:lastRoute", name: "Map", component: Map, props: true },
      {
        path: "/touch",
        name: "TouchScreen",
        component: TouchScreen,
        props: true,
      },
      {
        path: "/info/:item/:lastRoute",
        name: "InfoItem",
        component: InfoItem,
        props: true,
      },
      { path: "/contact", name: "Contact", component: Contact, props: true },
      { path: "/about", name: "About", component: About, props: true },
    ],
  },
];

export default routes;
