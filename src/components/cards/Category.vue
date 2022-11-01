<template>
  <div class="container">
    <div class="categories">
      <button
        @click="category(item.category)"
        class="categories__btn"
        :class="{ active: isActiveButton === item.category }"
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
          category: undefined,
        },
        {
          name: "Phone",
          category: "phone",
        },
        {
          name: "Cars",
          category: "car",
        },
        {
          name: "Computer",
          category: "laptop",
        },
      ],
    };
  },

  methods: {
    category(category) {
      this.isActiveButton = category;
      this.$emit("category", category);
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
  padding: 8px;
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

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