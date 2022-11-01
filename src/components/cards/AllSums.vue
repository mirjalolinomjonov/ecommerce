<template>
  <div class="result">
    <ul class="result-list">
      <li
        v-for="(item, index) in results"
        :key="index"
        class="result-list__item"
      >
        <span>{{ item.label }}</span>
        <span> {{ item.value }} </span>
      </li>
    </ul>

    <div class="result-buttons">
      <button
        v-for="(item, index) in buttons"
        :key="index"
        @click="onHandler(index)"
        class="result-buttons__item"
      >
        <i :class="item.icon"></i>
        <span>
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { formatNum } from "@/helpers/main.js";
import { mapState } from "vuex";

export default {
  props: {
    curentProductCount: Number,
  },
  data() {
    return {
      buttons: [
        {
          label: "All discount",
          icon: "far fa-clipboard",
        },
        {
          label: "Client",
          icon: "fa fa-user",
        },
        {
          label: "Print",
          icon: "fa fa-print",
        },
        {
          label: "Cleared",
          icon: "",
        },
        {
          label: "Postponement",
          icon: "",
        },
        {
          label: "Pay",
          icon: "",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      basket: (state) => state.basket,
    }),

    results() {
      return [
        {
          label: "All sums",
          value: `${formatNum(this.$store.getters.GET_ALL_SUMS)} $`,
        },
        {
          label: "Discount",
          value: `${formatNum(this.$store.getters.DISCOUNT)} $`,
        },
        {
          label: "Elements",
          value: formatNum(this.$store.getters.ELEMENTS),
        },
        {
          label: "Client",
          value: "Select client",
        },
        {
          label: "Cashier (Salesman)",
          value: "Mirjalol",
        },
      ];
    },
  },
  methods: {
    formatNum,
    onHandler(index) {
      // selected all-discount button
      if (index === 0) {
        this.$emit("openDiscountModal");

        // selected clear button
      } else if (index === 3) {
        console.log("clear basket");
        // let id = 1;
        // while (id <= this.basket.length) {
        //   this.$store.commit("CLEAR_BASKET");
        //   this.$store.dispatch("removeProductFromBasket", id);
        //   id += 1;
        // }

        // selected pay buttons
      } else if (index === 5) {
        this.$router.push({ name: "payment" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 8px;
  background-color: #e4e4e7;

  // result-list__item
  &-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: #9ca3af;
    &:first-child {
      font-size: 18px;
    }
    &:not(:last-child) {
      margin-bottom: 4px;
    }
    span:last-child {
      color: #27272a;
    }
  }

  // result-buttons
  &-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    margin-top: 6px;
    // result-buttons__item
    &__item {
      width: 100%;
      border: none;
      padding: 1rem;
      color: #a1a1aa;
      background-color: #fff;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      &:nth-child(4) {
        color: #fff;
        background-color: #ef4444;
      }
      &:nth-child(5) {
        color: #fff;
        background-color: #0ea5e9;
      }
      &:last-child {
        color: #fff;
        background-color: #22c55e;
      }
      &:nth-child(n + 4):hover {
        color: #fff;
        opacity: 0.7;
      }
      &:hover {
        color: #27272a;
      }
      i {
        display: block;
        margin-bottom: 4px;
      }
    }
  }
}
</style>