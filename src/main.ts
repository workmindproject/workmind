import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";

import "./assets/global.css";

import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "./plugins/firebase";
import { usePopState } from "./plugins/popstate";


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

app.mount("#app");
