<template>
  <main class="main">
    <div>
      <Header />
      <bread-crumb />
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
              reminder: item.reminder,
            }"
          />
        </template>
      </div>
    </div>

    <!-- ASIDE -->
    <basket />
  </main>
</template>

<script>
import Header from "@/components/layouts/Header.vue";
import BreadCrumb from "@/components/common/BreadCrumb.vue";
import Category from "@/components/cards/Category.vue";
import ProductSkeleton from "@/components/cards/ProductSkeleton.vue";
import Product from "@/components/cards/Product.vue";
import Basket from "@/components/common/Basket.vue";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    BreadCrumb,
    Category,
    ProductSkeleton,
    Product,
    Basket,
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
      console.log('category keldi',category);
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

.main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: $sky-800;
  min-height: 100vh;
}
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
}
</style>