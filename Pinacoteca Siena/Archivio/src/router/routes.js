import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import User from "../pages/User.vue";

import HomeInventario from "../inventario/pages/Home.vue";
// authentication
import Login from "../pages/Login.vue";
import Logout from "../pages/Logout.vue";

// ARCHIVIO
import MainLayoutArc from "../inventario/layouts/MainLayout.vue";
import ListItemsArc from "../inventario/components/Item/ListItems.vue";
import searchArc from "../inventario/components/Item/SearchItem.vue";
import searchApp from "../inventario/components/Item/Searchapp/SearchItem.vue";

import CreateItemArc from "../inventario/components/Item/CreateItem.vue";
import EditItemArc from "../inventario/components/Item/EditItem.vue";
import EditRoleArc from "../inventario/components/Item/EditRole.vue";
import userArc from "../inventario/pages/User.vue";
import InfoItemArch from "../inventario/components/Item/InfoItem.vue";
import modelFav from "../inventario/components/Item/PrintItem/modelFav.vue";
import modelSan from "../inventario/components/Item/PrintItem/modelSan.vue";
import modelPres from "../inventario/components/Item/PrintItem/modelPres.vue";
import printItem from "../inventario/components/Item/PrintItem/printItem.vue";

import CreateItem from "../inventario/components/Item/CreateItem.vue";


import ItemsMap from '../inventario/components/Item/ItemsMap.vue'
import AppDashboard from '../inventario/components/Item/AppDashboard.vue'



// Fotografico
import HomeFotografico from "../fotografico/pages/Home.vue";
import MainLayoutFot from "../fotografico/layouts/MainLayout.vue";
import ListItemsFot from "../fotografico/components/Item/ListItems.vue";
import searchFot from "../fotografico/components/Item/SearchItem.vue";
import CreateItemFot from "../fotografico/components/Item/CreateItem.vue";
import EditItemFot from "../fotografico/components/Item/EditItem.vue";
import userFot from "../fotografico/pages/User.vue";
import InfoItemFot from "../fotografico/components/Item/InfoItem.vue";
import stampaSintetica from "../fotografico/components/Item/PrintItem/stampaSintetica.vue";
import printItemFot from "../fotografico/components/Item/PrintItem/printItem.vue"




// Biblioteca
import HomeBiblioteca from "../biblioteca/pages/Home.vue";
import MainLayoutBib from "../biblioteca/layouts/MainLayout.vue";
import ListItemsBib from "../biblioteca/components/Item/ListItems.vue";
import searchBib from "../biblioteca/components/Item/SearchItem.vue";
import searchUBib from "../biblioteca/components/Item/SearchUser.vue";
import CreateItemBib from "../biblioteca/components/Item/CreateItem.vue";
import EditItemBib from "../biblioteca/components/Item/EditItem.vue";
import userBib from "../biblioteca/pages/User.vue";
import InfoItemBib from "../biblioteca/components/Item/InfoItem.vue";
import stampaSinteticaBib from "../biblioteca/components/Item/PrintItem/stampaSintetica.vue";
import printItemBib from "../biblioteca/components/Item/PrintItem/printItem.vue"


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
        path: "/inventario/home",
        name: "homeInventario",
        component: HomeInventario,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventario/touch/map",
        name: "ItemsMap",
        component: ItemsMap,
        meta: { requiresAuth: true },
      },
     
      {
        path: "/inventario/:collection",
        name: "listArc",
        component: ListItemsArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventario/search/:piano",
        name: "searchArc",
        component: searchArc,
        props: true,
        meta: { requiresAuth: true },
      },
      { path: '/items/searchApp', name: 'searchApp', component: searchApp,meta: { requiresAuth: true }, props: false, },

      {
        path: "/inventario/create/:collection",
        name: "createArc",
        component: CreateItemArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventario/edit/:collection/:id",
        name: "editItemArc",
        component: EditItemArc,
        props: true,
      },
      {
        path: "/inventario/editRole/:id",
        name: "editRoleArc",
        component: EditRoleArc,
        props: true,
      },
      {
        path: "/inventario/profile",
        name: "userArc",
        component: userArc,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventario/items/:collection/:id",
        name: "InfoItemArch",
        component: InfoItemArch,
        props: true,
      },
      {
        path: "/inventario/print/favorite",
        name: "modelFav",
        component: modelFav,
        props: true,
      },
      {
        path: "/inventario/print/sanitaria/:id",
        name: "modelSan",
        component: modelSan,
        props: true,
      },
      {
        path: "/inventario/print/prestito/:id",
        name: "modelPres",
        component: modelPres,
        props: true,
      },
      {
        path: "/inventario/print/printItem/:id",
        name: "printItem",
        component: printItem,
        props: true,
      },
      
      {
        path: "/inventario/:collection/create",
        name: "CreateArc",
        component: CreateItem,
        props: true,
      }, {
        path: "/inventario/app/dashboard",
        name: "appDash",
        component: AppDashboard,
        props: true,
      },
    ],
  },
  {
    path: "/",
    component: MainLayoutFot,
    children: [
      {
        path: "/fotografico/home",
        name: "homeFotografico",
        component: HomeFotografico,
        meta: { requiresAuth: true },
      },
      {
        path: "/fotografico/:collection",
        name: "listFot",
        component: ListItemsFot,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/fotografico/search/:piano",
        name: "searchFot",
        component: searchFot,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/fotografico/create/:collection",
        name: "createFot",
        component: CreateItemFot,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/fotografico/edit/:collection/:id",
        name: "editItemFot",
        component: EditItemFot,
        props: true,
      },
      {
        path: "/fotografico/profile",
        name: "userFot",
        component: userFot,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/fotografico/items/:collection/:id",
        name: "InfoItemFot",
        component: InfoItemFot,
        props: true,
      },
      {
        path: "/fotografico/:collection/create",
        name: "CreateFot",
        component: CreateItemFot,
        props: true,
      }, 
      {
        path: "/fotografico/print/:id",
        name: "printItemFot",
        component: stampaSintetica,
        props: true,
      }, {
        path: "/fotografico/screenshot/:id",
        name: "printItem2",
        component: printItemFot,
        props: true,
      },
    ],
  },


  {
    path: "/",
    component: MainLayoutBib,
    children: [
      {
        path: "/biblioteca/home",
        name: "homeBiblioteca",
        component: HomeBiblioteca,
        meta: { requiresAuth: true },
      },
      {
        path: "/biblioteca/:collection",
        name: "listBib",
        component: ListItemsBib,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/biblioteca/search/:piano",
        name: "searchBib",
        component: searchBib,
        props: true,
        meta: { requiresAuth: true },
      },  {
        path: "/biblioteca/searchU/:piano",
        name: "searchUBib",
        component: searchUBib,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/biblioteca/create/:collection",
        name: "createBib",
        component: CreateItemBib,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/biblioteca/edit/:collection/:id",
        name: "editItemBib",
        component: EditItemBib,
        props: true,
      },
      {
        path: "/biblioteca/profile",
        name: "userBib",
        component: userBib,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/biblioteca/items/:collection/:id",
        name: "InfoItemBib",
        component: InfoItemBib,
        props: true,
      },
      {
        path: "/biblioteca/:collection/create",
        name: "CreateBib",
        component: CreateItemBib,
        props: true,
      }, 
      {
        path: "/biblioteca/print/:id",
        name: "printItemBib",
        component: stampaSinteticaBib,
        props: true,
      }, {
        path: "/biblioteca/screenshot/:id",
        name: "printItem2Bib",
        component: printItemBib,
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
