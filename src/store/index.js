import { createStore } from "vuex";
import axios from "@/plugins/axios.js";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    loading: false,
    products: [],
    basket: [],
  },
  getters: {},
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCT_FROM_BASKET(state, payload) {
      state.basket = payload;
    },
  },

  actions: {
    async fetchAllProducts({ state, commit }) {
      state.loading = true;
      console.log("fetch", state.loading);
      return await new Promise((resolve, reject) => {
        this.$axios
          .get("/products")
          .then((res) => {
            commit("SET_PRODUCTS", res.data);
            console.log(res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error))
          .finally(() => {
            state.loading = false;
            console.log("finally", state.loading);
          });
      });
    },

    async fetchProductsByCategory(
      { state, commit },
      { category = undefined }
    ) {
      state.loading = true;

      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`/products?category=${category}`)
          .then((res) => {
            console.log(res.data);
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
            commit("SET_PRODUCT_FROM_BASKET", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },

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

    async removeProductFromBasket({ dispatch }, id) {
      console.log('id=',id);
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
  },
  modules: {},
  plugins: [axiosPlugin],
});
