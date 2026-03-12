import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import User from "../pages/User.vue";

import HomeArchivio from "../archivio/pages/Home.vue";
// authentication
import Login from "../pages/Login.vue";
import Logout from "../pages/Logout.vue";

// ARCHIVIO
import MainLayoutArc from "../archivio/layouts/MainLayout.vue";
import ListItemsArc from "../archivio/components/Item/ListItems.vue";
import searchArc from "../archivio/components/Item/SearchItem.vue";
import searchApp from "../archivio/components/Item/Searchapp/SearchItem.vue";

import CreateItemArc from "../archivio/components/Item/CreateItem.vue";
import EditItemArc from "../archivio/components/Item/EditItem.vue";
import EditRoleArc from "../archivio/components/Item/EditRole.vue";
import userArc from "../archivio/pages/User.vue";
import InfoItemArch from "../archivio/components/Item/InfoItem.vue";
import modelFav from "../archivio/components/Item/PrintItem/modelFav.vue";
import modelSan from "../archivio/components/Item/PrintItem/modelSan.vue";
import modelPres from "../archivio/components/Item/PrintItem/modelPres.vue";
import printItem from "../archivio/components/Item/PrintItem/printItem.vue";
import printItem2 from "../archivio/components/Item/PrintItem/stampaSintetica.vue";
import printItemU from "../archivio/components/Item/PrintItem/stampaUtente.vue";

import CreateItem from "../archivio/components/Item/CreateItem.vue";


import ItemsMap from '../archivio/components/Item/ItemsMap.vue'
import AppDashboard from '../archivio/components/Item/AppDashboard.vue'

const routes = [
  { path: "/login/:program", name: "login", component: Login, props: true },
  { path: "", name: "home", component: Home, props: true },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
  // INVENTARIO

  {
    path: "/",
    component: MainLayoutArc,
    children: [
      {
        path: "/archivio/home",
        name: "homeArchivio",
        component: HomeArchivio,
        meta: { requiresAuth: true },
      },
      {
        path: "/archivio/touch/map",
        name: "ItemsMap",
        component: ItemsMap,
        meta: { requiresAuth: true },
      },
     
      {
        path: "/archivio/:collection",
        name: "listArc",
        component: ListItemsArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/archivio/search/:piano",
        name: "searchArc",
        component: searchArc,
        props: true,
        meta: { requiresAuth: true },
      },
      { path: '/items/searchApp', name: 'searchApp', component: searchApp,meta: { requiresAuth: true }, props: false, },

      {
        path: "/archivio/create/:collection",
        name: "createArc",
        component: CreateItemArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/archivio/edit/:collection/:id",
        name: "editItemArc",
        component: EditItemArc,
        props: true,
      },
      {
        path: "/archivio/editRole/:id",
        name: "editRoleArc",
        component: EditRoleArc,
        props: true,
      },
      {
        path: "/archivio/profile",
        name: "userArc",
        component: userArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/archivio/items/:collection/:id",
        name: "InfoItemArch",
        component: InfoItemArch,
        props: true,
      },
      {
        path: "/archivio/print/favorite",
        name: "modelFav",
        component: modelFav,
        props: true,
      },
      {
        path: "/archivio/print/sanitaria/:id",
        name: "modelSan",
        component: modelSan,
        props: true,
      },
      {
        path: "/archivio/print/prestito/:id",
        name: "modelPres",
        component: modelPres,
        props: true,
      },
      {
        path: "/archivio/print/printItem/:id",
        name: "printItem",
        component: printItem,
        props: true,
      }, {
        path: "/archivio/print/printItem2/:id",
        name: "printItem2",
        component: printItem2,
        props: true,
      },
      {
        path: "/archivio/print/utente/:id",
        name: "printItemU",
        component: printItemU,
        props: true,
      },
      
      {
        path: "/archivio/print/:collection/create",
        name: "CreateArc",
        component: CreateItem,
        props: true,
      }, {
        path: "/archivio/app/dashboard",
        name: "appDash",
        component: AppDashboard,
        props: true,
      },
    ],
  },

  {
    path: "/user",
    name: "user",
    component: User,
    meta: { requiresAuth: true },
  },
];

export default routes;
