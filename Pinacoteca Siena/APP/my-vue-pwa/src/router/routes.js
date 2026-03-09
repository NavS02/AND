import Home from "../pages/Home.vue";
import MainLayout from "../pages/MainLayout.vue";
import ListOpere from "../pages/ListOpere.vue";
import AudioInput from "../pages/AudioInput.vue";
import Credits from "../pages/Credits.vue";
import SingleItem from "../pages/SingleItem.vue";
import CollocazionePage from "../pages/CollocazionePage.vue";
import EventPage from "../pages/EventPage.vue";
import schedaEvento from "../pages/schedaEvento.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/:lingua/:tipologia", name: "home", component: Home, props: true },
      { path: "/:lingua/:tipologia/listOpere", name: "ListOpere", component: ListOpere, props: true },
      { path: "/:lingua/:tipologia/info/:info", name: "SingleItem", component: SingleItem, props: true },
      { path: "/:lingua/:tipologia/opere", name: "CollocazionePage", component: CollocazionePage, props: true },
      { path: "/:lingua/:tipologia/AudioInput", name: "AudioInput", component: AudioInput, props: true },
      { path: "/:lingua/:tipologia/Credits", name: "Credits", component: Credits, props: true },
      { path: "/:lingua/:tipologia/event", name: "EventPage", component: EventPage, props: true },
      { path: "/:lingua/:tipologia/event/scheda", name: "schedaEvento", component: schedaEvento, props: true },
     
    ],
  },
];

export default routes;
