<template>
  <div class="container">
    <div class="categories">
      <button
        @click="category(item.category__id)"
        class="categories__btn"
        :class="{ active: isActiveButton === item.category__id }"
        v-for="(item, index) in categories"
        :key="index"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveButton: undefined,
      categories: [
        {
          name: "All",
          category__id: undefined,
        },
        {
          name: "Phone",
          category__id: 1,
        },
        {
          name: "Cars",
          category__id: 2,
        },
        {
          name: "Computer",
          category__id: 3,
        },
      ],
    };
  },

  methods: {
    category(categoryId) {
      this.isActiveButton = categoryId;
      this.$emit("category", categoryId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 8px 0;

  // categories__btn
  &__btn {
    border: none;
    padding: 1.5rem 1rem;
    border-radius: 6px;
    color: #fff;
    font-weight: 500;
    font-size: 1.25rem;
    background-color: $sky-500;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &.active {
      background-color: $green-600;
    }
    &:hover {
      background-color: $green-500;
    }
  }
}
</style>