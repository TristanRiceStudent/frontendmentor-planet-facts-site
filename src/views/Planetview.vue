<template>
  <div id="container">
      <nav class="nav">
          <h1 class="antonio-medium nav__title">THE PLANETS</h1>
          <div 
            :class="['nav__planets', {'not-hidden': mobileNavOpened}]">
              <router-link 
                v-for="[name, color] in Object.entries(allPlanets)"
                :key="name"
                :to="'/' + name"
                class="nav__planet-link spartan-bold"
                :style="`--hov-color: ${color}`"
              >{{name}}</router-link>
          </div>
          <label class="mobile-nav-checkbox" for="roll-out-mobile-nav">
              <img 
                :class="['mobile-nav-checkbox__icon', {selected: mobileNavOpened}]" 
                :src="hamburgerIcon">
          </label>
          <input 
            type="checkbox" 
            id="roll-out-mobile-nav"
            class="hidden"
            v-model="mobileNavOpened">
      </nav>
      <div 
        :class="['planet-container', {hidden: mobileNavOpened}]">
        <Planet 
            :planetName="planetName" 
            :color="planetColor"
            :formattedData="dataAsHashMap" />
      </div>
  </div>
</template>

<script>
import Planet from "@/components/Planet.vue"
import hamburgerIcon from "@/assets/icon-hamburger.svg";
import data from "@/data.json";

let dataKeysAndValues = data.map(a => [a.name, a]);
let dataAsHashMap = Object.fromEntries(dataKeysAndValues);

export default {
    data() {
        let allPlanets = {
            "Mercury": "#419EBB", "Venus": "#EDA249", "Earth": "#6D2ED5",
            "Mars": "#D14C32", "Jupiter": "#D83A34", "Saturn": "#CD5120",
            "Uranus": "#1EC1A2", "Neptune": "#2D68F0" 
        }
        return {
            allPlanets,
            hamburgerIcon,
            mobileNavOpened: false,
            dataAsHashMap
        }
    },
    computed: {
        planetName() {
            return this.$route.params.planetName || "Venus";
        },

        planetColor() {
            return this.allPlanets[this.planetName]
        }
    },
    components: {
        Planet
    }
}
</script>

<style>

</style>