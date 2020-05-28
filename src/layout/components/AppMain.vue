<template>
    <el-card class="card-box app-main">
        <!-- <section class="app-main"> -->
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <router-view :key="key" />
                </keep-alive>
            </transition>
        <!-- </section> -->
    </el-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
export default class extends Vue {
    get key() {
        return this.$route.path;
    }
}
</script>

<style scoped lang="less">
.app-main{
    flex: 1;
    background: #fff;
}
</style>