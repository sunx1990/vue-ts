<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
export default class extends Vue{
    get key(){
        return this.$route.path
    }
}
</script>

<style scoped>

</style>