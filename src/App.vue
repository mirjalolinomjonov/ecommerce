<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/layouts/Header.vue";
import BreadCrumb from "@/components/common/BreadCrumb.vue";
import Basket from "@/components/common/Basket.vue";
</script>

<template>
  <main class="app">
    <div>
      <Header />
      <bread-crumb />
      <RouterView />
    </div>

    <!-- ASIDE -->
    <basket />
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.app {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: $sky-800;
  min-height: 100vh;
}
</style>
