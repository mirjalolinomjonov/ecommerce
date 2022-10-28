<template>
  <header class="header">
      <router-link class="header__logo" to="/"> ecommerce </router-link>

      <!-- navbar -->
      <!-- <nav class="nav">
        <ul class="nav-list">
          <li class="nav-list__item">

          </li>
        </ul>
      </nav> -->
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.header {
  padding: 15px 8px;
  background-color: $sky-400;
  text-align: center;

  // header__logo
  &__logo {
    display: inline-block;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    &::first-letter{
      color: #fb923c;
      font-size: 2.25rem;
      font-weight: 900;
    }
  }
}
</style>