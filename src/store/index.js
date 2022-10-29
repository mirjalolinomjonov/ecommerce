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
  getters: {},
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_ONE_PRODUCT(state, payload) {
      state.oneProduct = payload;
    },
    SET_PRODUCT_FROM_BASKET(state, payload) {
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
  },

  actions: {
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

    async editOneProduct({ commit }, data) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .put(`/basket/${data.id}`, data)
          .then((res) => {
            console.log('edit pro',res.data);
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
