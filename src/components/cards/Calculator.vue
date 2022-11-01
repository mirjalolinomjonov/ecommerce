<template>
  <div>
    <div class="calculator">
      <ul class="calculator-info">
        <div>
          <li
            v-for="(item, index) in calcInfo"
            :key="index"
            class="calculator-info__item"
          >
            <span>{{ item.label }}</span>
            <span>
              {{ formatNum(item.value) }}
              {{ index === 0 || index === 1 ? "$" : "" }}
            </span>
          </li>
        </div>
        <h2 class="calculator-info__currency">UZS</h2>
      </ul>

      <!-- calculator-indicator -->
      <div class="calculator-indicator">
        <div class="calculator-indicator__result">
          {{ formatNum(calcValue) || 0 }}
        </div>
        <div class="calculator-indicator__numbers">
          <button
            @click="action(item)"
            v-for="(item, index) in numbers"
            :key="index"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
    <!-- type of payment and pay-->
    <div class="typeof-payment">
      <button
        v-for="(item, index) in typeofPayment"
        :key="index"
        @click="onHandler(index)"
        class="typeof-payment__item"
        :class="item.color"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- modal window -->
    <payment-modal
      :resultSum="`${calcValue - $store.getters.GET_ALL_SUMS}`"
      :isShowModal="isShowModal"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import { formatNum } from "@/helpers/main.js";
import PaymentModal from "@/components/modal/PaymentModal.vue";
export default {
  components: { PaymentModal },
  data() {
    return {
      isShowModal: false,
      calcValue: 0,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "<"],
      typeofPayment: [
        {
          label: "Cash",
          color: "green",
        },
        {
          label: "Carta",
          color: "blue",
        },
        {
          label: "Combination",
          color: "red",
        },
        {
          label: "Curency",
          color: "blue",
        },
        {
          label: "Pay",
          color: "green",
        },
      ],
    };
  },
  computed: {
    calcInfo() {
      return [
        {
          label: "All sums",
          value: this.$store.getters.GET_ALL_SUMS,
        },
        {
          label: "Discount",
          value: this.$store.getters.DISCOUNT,
        },
        {
          label: "Element",
          value: this.$store.getters.ELEMENTS,
        },
        {
          label: "Client",
          value: "",
        },
      ];
    },
  },

  methods: {
    formatNum,
    action(n) {
      if (!isNaN(n) || n === ".") {
        this.calcValue += n + "";
      } else if (n === "<") {
        this.calcValue = this.calcValue.substr(0, this.calcValue.length - 1);
      }
    },

    onHandler(index) {
      // selected payment button
      if (index === 4) {
        this.isShowModal = true;
        document.body.style.overflow = "hidden";
      }
    },

    closeModal() {
      this.isShowModal = false;
      document.body.style.overflow = "visible";
    },
  },
};
</script>

<style lang="scss" scoped>
.calculator {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;

  // calculator-info
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    background-color: #fff;
    // calculator-info__item
    &__item {
      margin-bottom: 12px;
      span {
        display: block;
        font-size: 1rem;
        color: #18181b;
        font-weight: 600;
        &:first-child {
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 2px;
        }
      }
    }
    // calculator-info__currency
    &__currency {
      text-align: center;
    }
  }

  // calculator-indicator
  &-indicator {
    background-color: #fff;
    // calculator-indicator__result
    &__result {
      padding: 24px 12px;
      text-align: right;
      color: #18181b;
      font-size: 2.5rem;
      // overflow: hidden;
    }
    // calculator-indicator__buttons
    &__numbers {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      button {
        width: 100%;
        padding: 2rem;
        font-size: 1.25rem;
        color: #0369a1;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
}

// typeof-payment
.typeof-payment {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  // typeof-payment__item
  &__item {
    width: 100%;
    border: none;
    padding: 1.5rem 1rem;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
      opacity: 0.85;
    }
    &:last-child {
      grid-column: 1/5;
    }
    &.green {
      background-color: #22c55e;
    }
    &.blue {
      background-color: #3b82f6;
    }
    &.red {
      background-color: #ef4444;
    }
  }
}
</style>