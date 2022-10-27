import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:3000",
});

export default $axios;

/* 
  ushbu buyruqni terminalga kiritish kk !!!

  npx json-server --watch db.json
*/
