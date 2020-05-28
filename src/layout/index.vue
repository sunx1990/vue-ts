<template>
    <div class="app-wrapper">
        <MyHeader/>
        <div class="app-content">
            <SideBar/>
            <AppMain/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MyHeader from './components/myHeader.vue'
import SideBar from './components/sidebar/index.vue';
import AppMain from './components/AppMain.vue';
@Component({
    name: 'Layout',
    components: {
        SideBar,
        AppMain,
        MyHeader
    },
})
export default class extends Vue {

}
</script>

<style scoped lang="less">
.app-wrapper{
    // display: flex;
    height: 100%;
}
.app-content{
    display: flex;
    background: #eee;
    padding: 0;
    height: 100%;
}
</style>