<template>
  <div class="modal" v-if="isShowDiscountModal">
    <div class="modal-content">
      <button @click="closeModal" class="modal-content__close">x</button>
      <h2 class="modal-content__title">Discount</h2>
      <ul class="discount-list">
        <li class="discount-list__item" v-if="isCurentProductDiscount">
          <span>{{ curentProduct?.name }}</span>
          <span>$ {{ curentProduct?.discount }}</span>
        </li>
        <li class="discount-list__item" v-else>
          <span>For all products</span>
          <span> $ {{ $store.getters.DISCOUNT }} </span>
        </li>
      </ul>
    </div>
    <div @click="closeModal" class="modal__bg"></div>
  </div>
</template>

<script>
export default {
  props: {
    isShowDiscountModal: Boolean,
    isCurentProductDiscount: Boolean,
    curentProduct: Object,
    basketData: Array,
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-content: center;
  // modal-content
  &-content {
    width: 30vw;
    position: relative;
    padding: 1rem;
    background-color: #fff;
    border-radius: 6px;
    z-index: 2;
    // modal-content__title
    &__title {
      color: #1c1917;
      font-size: 2rem;
    }

    // modal-content__close
    &__close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 1px solid #78716c;
      font-size: 1.5rem;
      background-color: transparent;
      color: #78716c;
      cursor: pointer;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  // modal__bg
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 1;
    cursor: pointer;
  }
}

// discount-list
.discount-list {
  margin-top: 4rem;
  // discount-list__item
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #1c1917;
    font-size: 1.5rem;
    span:first-child {
      opacity: 0.6;
    }
  }
}
</style>