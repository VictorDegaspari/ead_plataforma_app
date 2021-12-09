import '@splidejs/splide/dist/css/splide.min.css'
// or
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import VueSplide from '@splidejs/vue-splide'
import axios from 'axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import * as Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import VueToast from 'vue-toast-notification'
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css'
// import VueYouTubeEmbed from 'vue-youtube-embed'
import api from './api'
import App from './App.vue'
import router from './router'

const app = Vue.createApp(App)

// app.use(VueYouTubeEmbed, { global: false })
app.config.globalProperties.$http = axios
app.config.globalProperties.api = api

app.use(VueToast, {
    position: 'bottom'
});

app.use(VueTheMask)
app.use(router);

app.use( VueSplide );
app.mount( '#app' );