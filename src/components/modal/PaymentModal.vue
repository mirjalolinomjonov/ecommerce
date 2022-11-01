<template>
  <div class="modal" v-if="isShowModal">
    <div class="modal-content">
      <button @click="closeModal" class="modal-content__close">x</button>
      <h3 class="modal-content__title">Qaytim: $ {{ resultSum }}</h3>
      <div class="modal-content__buttons">
        <button
          v-for="(item, index) in buttons"
          :key="index"
          @click="closeModal"
          class="modal-content__buttons-item"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div @click="closeModal" class="modal__bg"></div>
  </div>
</template>

<script>
export default {
  props: {
    resultSum: {
      type: Number,
      default: () => 0,
    },
    isShowModal: Boolean,
  },
  data() {
    return {
      buttons: ["Close", "Save"],
    };
  },
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
  overflow: hidden;
  z-index: 999;
  display: grid;
  place-content: center;

  // modal-content
  &-content {
    position: relative;
    width: 25vw;
    background-color: #fff;
    padding: 16px 8px 24px;
    border-radius: 6px;
    z-index: 2;
    // modal-content__close
    &__close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid #1c1917;
      color: #1c1917;
      background-color: #fff;
      font-size: 1rem;
      cursor: pointer;
      z-index: 3;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    // modal-content__title
    &__title {
      color: #1c1917;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
    }
    // modal-content__buttons
    &__buttons {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      gap: 8px;
      // modal-content__buttons-item
      &-item {
        border: 1px solid #a8a29e;
        border-radius: 4px;
        padding: 1rem;
        width: 100%;
        background-color: #fff;
        color: #a8a29e;
        cursor: pointer;
        transition: all 0.25s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:last-child {
          color: #fff;
          background-color: #22c55e;
          border-color: #22c55e;
        }
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
    z-index: 1;
    background: rgba($color: #000000, $alpha: 0.5);
    cursor: pointer;
  }
}
</style>