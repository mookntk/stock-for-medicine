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
      component: () => import("./views/OrderDetail.vue")
    },
    // {
    //   path: "/test",
    //   name: "Hospital",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/test.vue")
    // },
    // {
    //   path: "/ordertoday",
    //   name: "Order_Today",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/OrderList_today.vue")
    // },
    {
      path: "/patient",
      name: "Patient",
      component: () => import("./views/Patient.vue")
    },
    {
      path: "/recall",
      name: "Racall_Medicine",
      component: () => import("./views/Recall_med.vue")
    },
    {
      path: "/order_history",
      name: "Order_History",
      component: () => import("./views/Order_History.vue")
    },
    {
      path: "/transfer_history",
      name: "Transfer_History",
      component: () => import("./views/Transfer_History.vue")
    }
  ]
});
