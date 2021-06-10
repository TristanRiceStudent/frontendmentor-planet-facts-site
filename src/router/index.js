import Vue from 'vue'
import VueRouter from 'vue-router'
import PlanetView from "../views/Planetview.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/:planetName?',
    name: 'planet',
    component: PlanetView,
    props: (route) => ({ planetName: route.params.planetName || "Venus" })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
