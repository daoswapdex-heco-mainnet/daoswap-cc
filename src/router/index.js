import Vue from "vue";
import VueRouter from "vue-router";
import CrowdsaleForAngel from "../views/CrowdsaleForAngel.vue";
import CrowdsaleForRetail from "../views/CrowdsaleForRetail.vue";
// import AirdropUnlimited from "../views/AirdropUnlimited.vue";
import AirdropToRelationship from "../views/AirdropToRelationship.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/home/Index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/Index.vue")
      },
      {
        path: "/angel",
        name: "Angel",
        component: CrowdsaleForAngel
      },
      {
        path: "/stake",
        name: "Stake",
        component: CrowdsaleForRetail
      },
      // {
      //   path: "/airdrop",
      //   name: "Airdrop",
      //   component: AirdropUnlimited
      // },
      {
        path: "/invite",
        name: "Invite",
        component: AirdropToRelationship
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes
});

export default router;
