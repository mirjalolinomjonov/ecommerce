<template>
  <button class="product">
    <h3 class="product__name">{{ name }}</h3>
    <span class="product__price">$ {{ formatNum(price) }}</span>
    <span class="product__reminder">{{ reminder }}</span>
  </button>
</template>

<script>
import { formatNum } from "@/helpers/main.js";
export default {
  props: {
    loading: Boolean,
    name: String,
    price: Number,
    reminder: String,
  },
  methods: {
    formatNum,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.product {
  width: 100%;
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: none;
  cursor: pointer;

  // product__name
  &__name {
    color: $stone-800;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 4px;
  }

  // product__price & product__reminder
  &__price,
  &__reminder {
    font-weight: 600;
    color: $stone-800;
    display: inline-block;
  }

  // product__price
  &__price {
    font-size: 1.3rem;
    margin-bottom: 6px;
  }

  // product__reminder
  &__reminder {
    font-size: 1rem;
  }
}
</style>