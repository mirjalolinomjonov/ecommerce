import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "@/plugins/axios.js";
import VueAxios from "vue-axios";

import "@/assets/styles/global.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.mount("#app");
