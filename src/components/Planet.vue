<template>
  <div class="main">
    <div class="planet-image-container">
        <img 
            v-show="chosenLabel == 'Overview'" 
            class="planet-image" 
            :src="images_.planet">
        <img
            v-show="chosenLabel == 'Internal Structure'"
            class="planet-image"
            :src="images_.internal">
        <div 
            v-show="chosenLabel == 'Surface Geology'"
        >
            <img 
                :src="images_.planet" 
                class="planet-image"> 
            <img
                class="planet-image overlay-image"
                :src="images_.geology">
        </div>
    </div>
    <div class="planet-info" :style="`--planet-color: ${color}`">
        <h1 class="planet-info__title antonio-medium">{{ planetInfo.name }}</h1>
        <p class="planet-info__fact spartan-normal">{{ currentPlanetInfo.content.content }}</p>
        <p class="planet-info__source spartan-normal">Source : <a class="source-link spartan-bold" :href="currentPlanetInfo.content.source" target="_blank">Wikipedia</a> <img class="source-image" :src="sourceIcon"></p>
        <div class="planet-radios-container">
            <template v-for="choice in labelChoices">
                <input 
                    type="radio"
                    :id="choice"
                    :key="`choice-${choice}`"
                    name="planet-choice"
                    :value="choice"
                    class="hidden planet__radio"
                    v-model="chosenLabel"
                >
                <label 
                    class="planet__button-label spartan-bold"
                    :for="choice"
                    :key=choice
                    tabindex="0"
                    v-on:keyup.enter="handleLabelClicked"
                >{{ choice }}</label>
            </template>
        </div>
    </div>
    <div class="planet-facts">
        <div class="planet-facts__fact" v-for="[factName, factValue] in planetFacts" :key="factName">
            <p class="fact__name spartan-bold">{{factName}}</p>
            <p class="fact__value antonio-medium">{{factValue}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import sourceIcon from "@/assets/icon-source.svg";

export default {
    props: ["planetName", "color", "formattedData"],

    data() {
        return {
            labelChoices: ["Overview", "Internal Structure", "Surface Geology"],
            chosenLabel: "Overview",
            sourceIcon       
        }
    },

    computed: {
        planetInfo() {
            let information = this.formattedData[this.planetName];
            return information;
        },

        images_() {
            let imageKeys = ["planet", "internal", "geology"];
            let qq = imageKeys.map((imageKey) => {
                let imageCtx = require.context("../assets", false);
                //remove ./assets from image url
                let imageUrl = this.formattedData[this.planetName].images[imageKey];
                let relative_path = imageUrl.replace("/assets", "");
                let image = imageCtx(relative_path);
                return [imageKey, image];
            });
            let images_ = Object.fromEntries(qq);
            return images_
        },

        currentPlanetInfo() {
            let choiceToImageKey = {
                "Overview": ["overview", "planet"], 
                "Internal Structure": ["structure", "internal"],
                "Surface Geology": ["geology", "geology"]
            }
            let [contentKey, imageKey] = choiceToImageKey[this.chosenLabel];
            return {
                "content": this.planetInfo[contentKey],
                "image": this.images_[imageKey]
                //"image": this.planetInfo.images[imageKey]
            }
        },

        planetFacts() {
            // Key of fact in json file, and then the name of the fact
            // that must be displayed on the website. 
            let factNames = [
                ["rotation", "ROTATION TIME"],
                ["revolution", "REVOLUTION TIME"],
                ["radius", "RADIUS"],
                ["temperature", "AVERAGE TEMP"]
            ];
            return Array.from(factNames, ([factKey, factName]) =>  
                [factName, this.planetInfo[factKey]]
            );
        }
    },
    methods: {
        handleLabelClicked(event)  {
            console.log(event.target.getAttribute("for"));
        }
    }
}
</script>