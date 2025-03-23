import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 修改分页器默认文字
zhCn.el.pagination.total = '共 `{total} 条`';
zhCn.el.pagination.goto = '跳至';
zhCn.el.pagination.pagesize = '条/页';
zhCn.el.pagination.pageClassifier = '页';

import App from './App.vue'
import router from './router'
import './mock';
const app = createApp(App);
app.use(createPinia())
app.use(router)

app.use(ElementPlus)
app.mount('#app')
