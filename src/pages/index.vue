<template>
  <main>
    <bread-crumb />
    <category @category="category" />
    <div class="dvider"></div>
    <div class="products-wrapper container">
      <product
        v-for="(item, index) in products"
        :key="index"
        v-bind="{
          name: item.name,
          price: item.price,
          reminder: item.reminder,
        }"
      />
    </div>
  </main>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb.vue";
import Category from "@/components/cards/Category.vue";
import Product from "@/components/cards/Product.vue";
import { mapState } from "vuex";

export default {
  components: { BreadCrumb, Category, Product },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchAllProducts");
  },

  methods: {
    category(id) {
      if (!id) {
        this.$store.dispatch("fetchAllProducts");
      } else {
        this.$store.dispatch("fetchProductsByCategory", { category_id: id });
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
  padding: 8px 0;
}
</style>