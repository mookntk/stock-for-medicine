import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Adminsection.vue")
    },
    {
      path: "/Hospitalstaff",
      name: "Hospitalstaff",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Hospitalstaff.vue")
    },
    {
      path: "/Phamacy",
      name: "Phamacy",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Phamacy.vue")
    },
    {
      path: "/Phamacist",
      name: "Phamacist",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Phamacist.vue")
    },
    {
      path: "/Medicine",
      name: "Medicine",
      component: () => import("./components/Medicine.vue")
    },
    {
      path: "/hospital",
      name: "Hospital",
      component: () => import("./views/Hospitalsection.vue")
    },
    {
      path: "/Orderdetail",
      name: "Orderdetail",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OrderDetail.vue")
    },
    {
      path: "/patient",
      name: "Patient",
      component: () => import("./views/Patient.vue")
    },
    {
      path: "/transfer_history",
      name: "Patient",
      component: () => import("./views/Transfer_History.vue")
    },
    {
      path: "/order_history",
      name: "Patient",
      component: () => import("./views/Order_History.vue")
    },
    {
      path: "/recall",
      name: "Patient",
      component: () => import("./views/Recall_med.vue")
    },
    {
      path: "/status_history",
      name: "Patient",
      component: () => import("./views/Status_history.vue")
    },
    {
      path: "/traceability",
      name: "Patient",
      component: () => import("./views/Sendback.vue")
    }
  ]
});
