import './assets/main.scss'

import { createApp } from 'vue'//导入vue createApp
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'


// 使用pinia(界面状态管理)
import {createPinia} from 'pinia'
const app = createApp(App)
const pinia = createPinia();
// 使用persist插件(使得pinia持久化)
import {createPersistedState} from "pinia-persistedstate-plugin";
 const persist = createPersistedState()
pinia.use(persist)


//导入中文
import locale from  'element-plus/dist/locale/zh-cn.js'


app.use(pinia);
app.use(router);
app.use(ElementPlus,{locale});
app.mount('#app')
