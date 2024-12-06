<template lang="pug">
div(style="width:150px" v-for="type in typesList" :key="type.id")
    el-checkbox(:label="type.name" size="large" :checked="filterTypes.includes(type.name)" @change="filterSave(type.name)")
        img(:src="type.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon" style="width: 100px")
</template>

<script>
export default {
    data() {
        return {
            filterTypes: [],
            typesList: [],
            TypeName: [],
        };
    },
    async created() {
        await this.fetchTypes();
        this.emitTypesList();
        },
    methods: {
        async fetchTypes() {
            const results = [];
            for (let i = 1; i < 19; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
                const data = await response.json();
                results.push(data);
            }
            this.typesList = results;
        },
        emitTypesList() {
            this.$emit('typesListSend', this.typesList);
        },
        filterSave(TypeName) {
            const index = this.filterTypes.indexOf(TypeName);
            if (index === -1) {
                this.filterTypes.push(TypeName); // Ajouter si non existant
            } else {
                this.filterTypes.splice(index, 1); // Supprimer si existant
            }
            // Émettre l'état mis à jour de filterTypes
            this.$emit('typeFiltersSelect', this.filterTypes);
            console.log(this.filterTypes)
        }
    },
};
</script>
