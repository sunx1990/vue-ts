<template>
    <div class="app-wrapper">
        <SideBar/>
        <AppMain/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import SideBar from './components/sidebar/index.vue'
    import AppMain from './components/AppMain.vue'
    @Component({
        name:'Layout',
        components:{
            SideBar,
            AppMain
        }
    })
    export default class extends Vue{
        
    }
    
</script>

<style scoped>

</style>