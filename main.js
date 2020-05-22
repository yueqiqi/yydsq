import Vue from 'vue'
import App from './App'
import global from 'untils/index.js'
Vue.prototype.$global = global
Vue.config.productionTip = false

//全局注入w-loading组件as
import wLoading from "@/components/loading/w-loading.vue";
Vue.component('w-loading',wLoading)


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
