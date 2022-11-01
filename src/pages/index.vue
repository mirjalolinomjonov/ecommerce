<template>
  <main class="main">
    <category @category="category" />
    <div class="dvider"></div>

    <!-- PRODUCTS WRAPPER -->
    <div class="products-wrapper">
      <!-- skeleton loader -->
      <template v-if="loading">
        <product-skeleton v-for="item in products" :key="item.name" />
      </template>

      <!-- product cards -->
      <template v-else>
        <product
          v-for="(item, index) in products"
          :key="index"
          v-bind="{
            loading: loading,
            name: item.name,
            category: item.category,
            price: item.price,
            discount: item.discount,
            reminder: item.reminder,
          }"
        />
        <!-- 
        <figure class="is-product">
          <img src="@/static/photos/empty-img.png" alt="" />
        </figure> -->
      </template>
    </div>
  </main>
</template>

<script>
import Category from "@/components/cards/Category.vue";
import ProductSkeleton from "@/components/cards/ProductSkeleton.vue";
import Product from "@/components/cards/Product.vue";
import { mapState } from "vuex";

export default {
  components: {
    Category,
    ProductSkeleton,
    Product,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      products: (state) => state.products,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchAllProducts");
  },

  methods: {
    category(category) {
      if (!category) {
        this.$store.dispatch("fetchAllProducts");
      } else {
        this.$store.dispatch("fetchProductsByCategory", { category: category });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.dvider {
  width: 100%;
  height: 1.5px;
  background-color: $sky-500;
}

.products-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 8px;
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.is-product {
  grid-column: 2/4;
}
</style>