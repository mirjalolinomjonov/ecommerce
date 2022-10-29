<template>
  <div class="product">
    <div class="product-info">
      <span class="product-info__item">{{ name }}</span>
      <span class="product-info__item">1</span>
      <span class="product-info__item">${{ price }}</span>
      <span class="product-info__item">${{ sum }}</span>
    </div>

    <div class="product__parameters">
      <button
        class="product__button"
        :class="item.color"
        v-for="(item, index) in productButton"
        :key="index"
      >
        <i :class="item.icon"></i>
      </button>

      <!-- negative, counter and plus buttons -->
      <div class="product__controls">
        <button
          @click="$emit('productNegative')"
          class="product__counter"
          :disabled="count <= 1"
        >
          -
        </button>

        <span class="product__result">{{ count }}</span>

        <button @click="$emit('productPlus')" class="product__counter">
          +
        </button>
      </div>

      <!-- remove button -->
      <button
        @click="removeProduct(index)"
        class="product__button product__button_red"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <p class="product__reminder">Warehouse: {{ reminder }} pcs</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    index: Number,
    id: Number,
    category: String,
    name: String,
    price: Number,
    sum: Number,
    reminder: Number,
    count: Number,
  },
  emits: ["productPlus", "productNegative"],
  data() {
    return {
      productButton: [
        {
          icon: "fas fa-pencil-alt",
          color: "orange",
        },
        {
          icon: "far fa-clipboard",
          color: "green",
        },
        {
          icon: "fas fa-save",
          color: "blue",
        },
      ],
    };
  },

  methods: {
    removeProduct(index) {
      this.$store.commit("REMOVE_PRODUCT_FROM_BASKET", index);
      this.$store.dispatch("removeProductFromBasket", this.id);
      this.$store.state.oneProduct = {};
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.product {
  background-color: $sky-400;
  padding: 8px;
  margin-bottom: 4px;

  // product-info
  &-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 8px;
    border-bottom: 1px solid #d6d3d180;
    // product-info__item
    &__item {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
    }
  }

  // product__parameters
  &__parameters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }

  // product__button
  &__button {
    border: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    &.orange {
      background-color: #f97316;
    }
    &.green {
      background-color: #059669;
    }
    &.blue {
      background-color: #2563eb;
    }
    &_red {
      background-color: #ef4444;
    }
    i {
      color: #fff;
    }
  }

  // product__controls
  &__controls {
    display: inline-flex;
    align-items: center;
  }

  // product__counter
  &__counter {
    width: 2rem;
    height: 2rem;
    border: none;
    font-size: 1.5rem;
    font-weight: 500;
    color: #262626;
    background-color: #e7e5e4;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;
    &:hover {
      background-color: #d6d3d1;
    }
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }

  // product__result
  &__result {
    width: 100px;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f4;
    color: #262626;
    text-align: center;
  }

  // product__reminder
  &__reminder {
    color: #fff;
    font-size: 14px;
  }
}
</style>