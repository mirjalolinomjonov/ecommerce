<template>
  <aside class="basket">
    <div>
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
        <span
          class="basket-table__item"
          v-for="item in tableHeader"
          :key="item"
        >
          {{ item }}
        </span>
      </div>

      <added-to-basket
        v-for="(item, index) in basketData"
        :key="index"
        v-bind="{
          index: index,
          id: item?.id,
          category: item?.category,
          name: item?.name,
          price: item?.price,
          discount: item?.discount,
          reminder: item?.reminder,
          count: item?.count,
        }"
        @product-plus="productPlus(item)"
        @product-negative="productNegative(item)"
        @open-discount-modal="openDiscountModal(item)"
      />
    </div>
    <!-- all sums -->
    <all-sums
      :isShowDiscountModal="isShowDiscountModal"
      :curentProductCount="curentProductCount"
      @open-discount-modal="
        (isShowDiscountModal = true), (isCurentProductDiscount = false)
      "
    />
    <!-- discount modal window -->
    <discount-modal
      :isShowDiscountModal="isShowDiscountModal"
      :isCurentProductDiscount="isCurentProductDiscount"
      :curentProduct="curentProduct"
      :basketData="basketData"
      @close-modal="isShowDiscountModal = false"
    />
  </aside>
</template>

<script>
import AddedToBasket from "@/components/cards/AddedToBasket.vue";
import AllSums from "@/components/cards/AllSums.vue";
import DiscountModal from "../modal/DiscountModal.vue";
import { mapState } from "vuex";

export default {
  components: { AddedToBasket, AllSums, DiscountModal },

  data() {
    return {
      isActiveButton: 0,
      curentProductCount: 1,
      isShowDiscountModal: false,
      isCurentProductDiscount: true,
      curentProduct: {},
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
      this.curentProductCount = data.count;
      this.$store.dispatch("editOneProduct", data);
    },
    
    productNegative(data) {
      if (data?.count > 1) {
        data.count -= 1;
        this.curentProductCount = data.count;
        this.$store.dispatch("editOneProduct", data);
      }
    },

    openDiscountModal(data) {
      console.log(data);
      this.isShowDiscountModal = true;
      this.isCurentProductDiscount = true;
      this.curentProduct = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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