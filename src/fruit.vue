<template>
    <div v-if="name">
        <h1>{{name}}</h1>
        <img :src="photoUrl">
        <button @click="handleFavorite">Favorite</button>
        <p v-if="favorite">You added this to your favorites.</p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Api } from "./api";

export default Vue.extend({
    data() {
        return {
            photoUrl: undefined,
            name: undefined
            favorite: false,
        };
    },
    props: {
        id: Number
    },
    methods: {
        handleFavorite() {
            this.favorite = !this.favorite;
        },
    },
    async created() {
        const response = await this.api.getFruitDetails(this.id);
        this.photoUrl = response.photo_url;
        this.name = response.name;
    },
    inject: ["api"],
});
</script>
