import { createStore } from "vuex";
import axios from "@/plugins/axios.js";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    loading: false,
    products: [],
  },
  getters: {},
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
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
      { category_id = undefined }
    ) {
      state.loading = true;

      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`/products?id=${category_id}`)
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
  },
  modules: {},
  plugins: [axiosPlugin],
});
