<template>
  <div class="skeleton">
    <!-- <div class="skeleton__thumbnail"></div> -->
    <h3 class="skeleton__name"></h3>
    <span class="skeleton__price"></span>
    <span class="skeleton__reminder"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: none;
  cursor: pointer;

  // skeleton__name
  &__name {
    width: 75%;
    height: 20px;
    border-radius: 5px;
    margin-bottom: 8px;
  }

  // skeleton__price
  &__price {
    width: 55%;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 12px;
  }

  // skeleton__reminder
  &__reminder {
    width: 60%;
    height: 20px;
    border-radius: 5px;
  }
}

.skeleton * {
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load 2s infinite;
}
@keyframes load {
  to {
    background-position: -100% 0;
  }
}
</style>