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
  base: "/frontendmentor-planet-facts-site/",
  routes
})

export default router
