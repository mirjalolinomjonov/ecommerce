<template>
  <aside class="basket">
    <!-- header -->
    <div class="basket-header">
      <button
        @click="isActiveButton = index"
        class="basket-header__button"
        :class="{ active: isActiveButton == index }"
        v-for="(item, index) in headerData"
        :key="index"
      >
        <i :class="item.icon"></i>
        <span class="basket-header__button-text">
          {{ item.text }}
        </span>
      </button>
    </div>

    <!-- table header -->
    <div class="basket-table">
      <span class="basket-table__item" v-for="item in tableHeader" :key="item">
        {{ item }}
      </span>
    </div>

    <added-to-basket
      v-for="(item, index) in basketData"
      :key="index"
      v-bind="{
        index: index,
        id: item.id,
        category: item.category,
        name: item.name,
        price: item.price,
        sum: 77,
        reminder: item.reminder,
        count: item?.count,
      }"
      @product-plus="productPlus(item)"
      @product-negative="productNegative(item)"
    />
  </aside>
</template>

<script>
import AddedToBasket from "@/components/cards/AddedToBasket.vue";
import { mapState } from "vuex";

export default {
  components: { AddedToBasket },
  data() {
    return {
      isActiveButton: 0,
      headerData: [
        {
          icon: "fas fa-shopping-basket",
          text: "Basket",
        },
        {
          icon: "fas fa-file-alt",
          text: "Notes",
        },
      ],
      tableHeader: ["Name", "Cop", "Price", "Sum"],
    };
  },
  computed: {
    ...mapState({
      basketData: (state) => state.basket,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchProductFromBasket");
  },
  methods: {
    productPlus(data) {
      data.count += 1;
      console.log(data.count, "keldi");
      this.$store.dispatch("editOneProduct", data);
    },
    productNegative(data) {
      if (data?.count > 1) {
        data.count -= 1;
      }
      this.$store.dispatch("editOneProduct", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  background-color: #fff;

  // basket-header
  &-header {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #d4d4d8;

    // basket-header__button
    &__button {
      padding: 2rem;
      width: 100%;
      border: none;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      background-color: transparent;
      &.active {
        background-color: #e4e4e7;
      }
      .fas {
        color: #a1a1aa;
        font-size: 1rem;
        margin-bottom: 5px;
      }
      // basket-header__button-text
      &-text {
        display: block;
        color: #a1a1aa;
        font-size: 0.8rem;
      }
    }
  }

  // basket-table
  &-table {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 8px;
    background-color: #f5f5f4;
    // basket-table__item
    &__item {
      font-size: 12px;
      font-weight: 600;
      color: #292524;
    }
  }
}
</style>