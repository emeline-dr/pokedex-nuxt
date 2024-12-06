<template lang="pug">
  el-collapse(style="width:80%; margin: 5% 10%")
    el-collapse-item(title="Recherche par type(s)" name="1")
      div.typesCheck
        AppTypes(@typesListSend="updateTypesList" @typeFiltersSelect="selectTypes")
  
    el-collapse-item(title="Recherche par nom" name="2")
      div 
        AppNames(@search="handleSearch")

  div(style="width:80%;margin:50px 10%;display:flex;justify-content:end")
    el-button(type="primary" plain) 
      NuxtLink(to="/favoris" style="color:rgb(24.4, 33.8, 43.5);font-weight:bold;") Montrer le(s) favori(s)
  
  div.pokemonDex
    div(style="display: flex; flex-wrap: wrap; justify-content: space-evenly;")
      div(v-for="pokemon in filteredPokemonList" :key="pokemon.id")
        el-card(shadow="hover" style="width: 175px")
          div.el-card__header {{ pokemon.name }}
            transition(name="shake")
              el-button(v-show="!isShaking[pokemon.name]" @click="addFavorites(pokemon.name, pokemon.sprites.front_default)" style="pointer-event:none;margin-top: 10px;")
                Icon(name="uil:heart" :style="getIconStyle(pokemon.name)" style="font-size: 20px;")
          img(:src="pokemon.sprites.front_default" style="width: 100%")
          p(v-if="typesFiltrage") {{ pokemon.id }} #<br>Height : {{ pokemon.height }}0 cm<br>Weight : {{ pokemon.weight }} gr
            div(v-for="type in pokemon.types" :key="type.type.name")
              span(v-for="typeImport in importTypesList" :key="typeImport.name")
                img(:src="typeImport.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon" v-if="typeImport.name === type.type.name" :alt="type.type.name")
            div(v-for="desc in descList" :key="desc.id")
              p(v-if="desc.id === pokemon.id") {{ desc['flavor_text_entries']['0']['flavor_text'] }}
</template>

<script>
export default {
  data() {
    return {
      pokemonsFave: [],
      pokemonList: [],
      descList: [],
      importTypesList: [],
      importFilterTypes: [],
      typesFiltrage: false,
      searchQuery: '',
      isShaking: {},
    };
  },
  async created() {
    await this.fetchPokemon();
    await this.fetchDesc();
  },
  mounted() {
    this.pokemonsFave = JSON.parse(localStorage.getItem('PokeFavoris')) || [];
  },
  computed: {
    filteredPokemonList() {
      let filteredList = this.pokemonList;

      if (this.importFilterTypes.length) {
        filteredList = filteredList.filter((pokemon) =>
          pokemon.types.some((type) => this.importFilterTypes.includes(type.type.name))
        );
      }

      if (this.searchQuery.trim() !== '') {
        filteredList = filteredList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filteredList;
    }
  },
  methods: {
    async fetchPokemon() {
      const results = [];
      for (let i = 1; i < 15; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        results.push(data);
      }
      this.pokemonList = results;
    },
    async fetchDesc() {
      const results = [];
      for (let i = 1; i < 15; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
        const data = await response.json();
        results.push(data);
      }
      this.descList = results;
    },
    addFavorites(pokemonName, pokemonImg) {
      this.triggerShake(pokemonName);
      if (!this.pokemonsFave.some(fave => fave.NomPoke === pokemonName)) {
        this.pokemonsFave.push({ NomPoke: pokemonName, imgPoke: pokemonImg });
        localStorage.setItem('PokeFavoris', JSON.stringify(this.pokemonsFave));
      } else {
        this.pokemonsFave = this.pokemonsFave.filter(fave => fave.NomPoke !== pokemonName);
      }
      
      localStorage.setItem('PokeFavoris', JSON.stringify(this.pokemonsFave));
    },
    triggerShake(pokemonName) {
      this.isShaking[pokemonName] = true;
      setTimeout(() => {
        this.isShaking[pokemonName] = false;
      }, 10);
    },
    getIconStyle(pokemonName) {
      //Est-ce que au moins un des Pokémon dans ma liste de favoris a le même nom que pokemonName ? - si oui red ; si non rien
      return this.pokemonsFave.some(fave => fave.NomPoke === pokemonName) ? 'color: red;' : '';
    },
    updateTypesList(types) {
      this.importTypesList = types;
    },
    selectTypes(filterTypes) {
      this.importFilterTypes = filterTypes;

      if (this.importFilterTypes.length > 0 || this.searchQuery.trim() !== '') {
        this.typesFiltrage = true;
      } else {
        this.typesFiltrage = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query.trim();
      if (this.importFilterTypes.length > 0 || this.searchQuery) {
        this.typesFiltrage = true;
      } else {
        this.typesFiltrage = false;
      }
    },
  },
};
</script>

<style lang="sass">
.shake-enter-active
  animation: shake 1s ease

@keyframes shake
  60%
    transform: translateX(5px) translateY(5px)

  65%
    transform: translateX(-5px) translateY(-5px)

  70%
    transform: translateX(4px) translateY(4px)

  75%
    transform: translateX(-4px) translateY(-4px)

  80%
    transform: translateX(3px) translateY(3px)

  85%
    transform: translateX(-3px) translateY(-3px)

  90%
    transform: translateX(2px) translateY(2px)

  95%
    transform: translateX(-2px) translateY(-2px)

  100%
    transform: translateX(0px) translateY(0px)

.pokemonDex
  display: flex
  flex-wrap: wrap 
  justify-content: space-evenly
  width: 90%
  margin: 5%

.el-card
  margin: 5px

.el-card__header
  text-transform: uppercase
  text-align: center

.typesCheck 
  display: flex
  flex-wrap: wrap
  justify-content: space-evenly
  width: 90%
  margin: 0 5%
</style>