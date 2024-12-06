<template lang="pug">
    el-input(v-model="query" @input="onInput" style="width: 240px" placeholder="Entrer le nom d'un pokémon")
</template>

<script>
export default {
    data() {
        return {
            query: '', 
        };
    },
    methods: {
        onInput() {
            this.$emit('search', this.query);
        },
    },
};
</script>