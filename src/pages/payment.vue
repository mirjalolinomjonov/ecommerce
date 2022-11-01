<template>
  <section class="payment">
    <calculator />
  </section>
</template>

<script>
import Calculator from "@/components/cards/Calculator.vue";
export default {
  components: { Calculator },
};
</script>

<style lang="scss" scoped>
.payment{
  padding: 2.5rem 5rem;
}
</style>