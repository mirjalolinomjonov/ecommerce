import { createStore } from "vuex";
import axios from "@/plugins/axios.js";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    loading: false,
    products: [],
    oneProduct: {},
    basket: [],
    isProducts: [],
  },

  getters: {
    GET_ALL_SUMS(state) {
      return state.basket.reduce((acc, curent) => {
        return acc + (curent.price - curent.discount) * curent.count;
      }, 0);
    },
    DISCOUNT(state) {
      return state.basket.reduce((acc, curent) => {
        return acc + curent.discount * curent.count;
      }, 0);
    },
    GET_CURENT_PRODUCT_DISCOUNT(state) {
      return (index) => {
        return state.basket[index].discount;
      };
    },
    // GET_CURENT_PRODUCT_COUNT(state) {
    //   return (index) => state.basket[index].count;
    // },
    ELEMENTS(state) {
      return state.basket.reduce((acc, curent) => {
        return acc + curent.count;
      }, 0);
    },
  },

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_ONE_PRODUCT(state, payload) {
      state.oneProduct = payload;
    },
    SET_PRODUCT_TO_BASKET(state, payload) {
      state.basket = payload;
    },
    CHECK_IS_PRODUCT_IN_BASKET(state, payload) {
      state.isProducts.push(payload);
      localStorage.setItem("isProducts", JSON.stringify(state.isProducts));
    },
    REMOVE_PRODUCT_FROM_BASKET(state, index) {
      state.isProducts.splice(index, 1);
      localStorage.setItem("isProducts", JSON.stringify(state.isProducts));
    },
    CLEAR_BASKET(state) {
      state.isProducts = [];
      localStorage.setItem("isProducts", JSON.stringify(state.isProducts));
    },
  },

  actions: {
    // GET REQUEST
    async fetchAllProducts({ state, commit }) {
      state.loading = true;
      return await new Promise((resolve, reject) => {
        this.$axios
          .get("/products")
          .then((res) => {
            commit("SET_PRODUCTS", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error))
          .finally(() => {
            state.loading = false;
          });
      });
    },
    async fetchProductsByCategory({ state, commit }, { category = undefined }) {
      state.loading = true;

      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`/products?category=${category}`)
          .then((res) => {
            commit("SET_PRODUCTS", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error))
          .finally(() => {
            state.loading = false;
          });
      });
    },
    async fetchProductFromBasket({ commit }) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .get("/basket")
          .then((res) => {
            commit("SET_PRODUCT_TO_BASKET", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },

    // POST REQUEST
    async setProductToBasket({ dispatch }, data) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .post("/basket", data)
          .then((res) => {
            dispatch("fetchProductFromBasket");
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },

    // DELETE REQUEST
    async removeProductFromBasket({ dispatch }, id) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .delete(`/basket/${id}`)
          .then((res) => {
            dispatch("fetchProductFromBasket");
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },

    // PUT REQUEST
    async editOneProduct({ commit }, data) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .put(`/basket/${data.id}`, data)
          .then((res) => {
            commit("SET_ONE_PRODUCT", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
  plugins: [axiosPlugin],
});
