/*
 * @Author: wzn
 * @Date: 2021-06-23 23:44:20
 * @description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import api from './api';

const app = createApp(App);
app.config.globalProperties.$http = api;
app.use(router).use(ElementPlus).mount('#app');
