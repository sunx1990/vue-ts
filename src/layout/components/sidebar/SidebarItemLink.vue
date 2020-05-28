<template>
    <router-link :to="to"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    @Component({
        name:'sidebarItemLink',
    })
    export default class extends Vue{
        @Prop({required:true}) private to!:string
    }
</script>

<style scoped>

</style>