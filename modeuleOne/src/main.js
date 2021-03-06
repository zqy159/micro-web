import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
// import './public-path';
console.log(window.__POWERED_BY_QIANKUN__, 'xxx')

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render() {
    router = new VueRouter({
        mode: 'history',
        routes,
    });

    instance = new Vue({
        router,
        render: h => h(App),
    }).$mount('#appOne');
}
// qiankun标识(进行区分用途)判断是否为内嵌页面
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// 不是内嵌下面不会执行
export async function bootstrap() {
    console.log('vue app bootstraped');
}

export async function mount(props) {
    console.log('props from main app', props, 'xxxx');
    render();
}
export async function unmount() {
    instance.$destroy();
    instance = null;
    router = null;
}