<template lang="pug">    
    h1(style="text-align:center;text-decoration:underline 5px;") Les Favoris

    el-button(type="primary" style="position: absolute; right: 5%; top: 5%;" plain)
        NuxtLink(to="/" style="color: rgb(24.4, 33.8, 43.5); font-weight: bold;") Retour à l'accueil
    

    div.pokemonDex
        transition-group(name="fade")
            el-card(shadow="hover" style="width: 175px" v-for="favePoke in pokemonsFave" :key="favePoke.NomPoke") 
                div.el-card__header {{ favePoke.NomPoke }}
                    el-button(@click="removeFavorite(favePoke.NomPoke)" style="margin-top:10px;color:red;")
                        Icon(name="uil:heart" style="font-size:20px;")
                img(:src="favePoke.imgPoke" style="width: 100%")
        div(v-show="!pokemonsFave.length" style="text-align:center;display: flex;align-items: center;") Il n'y a pas de pokémon favori.
            Icon(name="material-symbols:warning" style="margin-left:5px;color:red;font-size:25px;") 
</template>

<script>
export default {
    data() {
        return {
            pokemonsFave: [],
        }
    },
    mounted() {
        this.pokemonsFave = JSON.parse(localStorage.getItem('PokeFavoris')) || [];
    },
    methods: {
        removeFavorite(pokemonName) {
            this.pokemonsFave = this.pokemonsFave.filter(fave => fave.NomPoke !== pokemonName);
            localStorage.setItem('PokeFavoris', JSON.stringify(this.pokemonsFave));
        },
    }
}
</script>

<style lang="sass">
.fade-enter
    opacity: 0

.fade-enter-active
    transition: opacity 1s

.fade-leave
    opacity: 1

.fade-leave-active
    transition: opacity 1s
    opacity: 0

</style>