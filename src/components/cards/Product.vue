<template>
  <button @click="addToBasket" class="product" :disabled="chekInIsProducts">
    <i
      class="fa fa-cart-arrow-down product__cart"
      :class="{ product__cart_green: chekInIsProducts }"
    ></i>
    <h3 class="product__name">{{ name }}</h3>
    <span class="product__price">$ {{ formatNum(price) }}</span>
    <span class="product__reminder">{{ reminder }} pcs</span>
  </button>
</template>

<script>
import { formatNum } from "@/helpers/main.js";
import { mapState } from "vuex";

export default {
  props: {
    loading: Boolean,
    name: String,
    category: String,
    price: Number,
    discount: Number,
    reminder: String,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isProducts: (state) => state.isProducts,
    }),
    chekInIsProducts() {
      return this.isProducts.includes(this.name);
    },
  },
  beforeMount() {
    this.$store.state.isProducts =
      JSON.parse(localStorage.getItem("isProducts")) || [];
  },
  methods: {
    formatNum,
    addToBasket() {
      this.$store.commit("CHECK_IS_PRODUCT_IN_BASKET", this.name);
      this.$store.dispatch("setProductToBasket", {
        name: this.name,
        category: this.category,
        price: this.price,
        discount: this.discount,
        reminder: this.reminder,
        count: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.product {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 15px 25px rgba($color: #000000, $alpha: 0.02);

  // product__cart
  &__cart {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 1rem;
    color: #d1d5db;
    &_green {
      color: #16a34a;
    }
  }

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