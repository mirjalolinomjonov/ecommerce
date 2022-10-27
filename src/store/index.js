import { createStore } from "vuex";
import axios from "@/plugins/axios.js";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    products: [],
  },
  getters: {},
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    async fetchAllProducts({ commit }) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .get("/products")
          .then((res) => {
            commit("SET_PRODUCTS", res.data);
            console.log(res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },

    async fetchProductsByCategory({ commit }, { category_id = undefined }) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`/products?id=${category_id}`)
          .then((res) => {
            console.log(res.data);
            commit("SET_PRODUCTS", res.data);
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
  plugins: [axiosPlugin],
});
