import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import { registerMicroApps, setDefaultMountApp, start, loadMicroApp } from "qiankun"
Vue.config.productionTip = false
let app = null;
/**
 * 渲染函数
 * appContent 子应用html内容
 * loading 子应用加载效果，可选
 */
function render({ appContent, loading } = {}) {
    if (!app) {
        app = new Vue({
            el: "#container",
            router,
            data() {
                return {
                    content: appContent,
                    loading
                };
            },
            render(h) {
                return h(App, {
                    props: {
                        content: this.content,
                        loading: this.loading
                    }
                });
            }

        });

    } else {
        app.content = appContent;
        app.loading = loading;
    }
}

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}

function initApp() {
    render({ appContent: '', loading: true });
}

initApp();

// 传入子应用的数据
let msg = {
    data: {
        auth: false
    },
    fns: [
        {
            name: "_LOGIN",
            _LOGIN(data) {
                console.log(`父应用返回信息${data}`);
            }
        }
    ]
};
// 注册子应用
registerMicroApps(
    [
        {
            name: "sub-One",
            container: '#sub-One',
            entry: "//localhost:8091",
            // render,
            activeRule: "/One",
            props: msg
        },
    ],
    {
        beforeLoad: [
            app => {
                console.log("before load", app);
            }
        ], // 挂载前回调
        beforeMount: [
            app => {
                console.log("before mount", app);
            }
        ], // 挂载后回调
        afterUnmount: [
            app => {
                console.log("after unload", app);
            }
        ] // 卸载后回调
    }
);
// 加载微应用
loadMicroApp({
    name: "sub-Two",
    container: '#sub-Two',
    entry: "//localhost:8092",
    props: {
        slogan: 'Hello Qiankun'
    },

});

// 设置默认子应用,与 genActiveRule中的参数保持一致
setDefaultMountApp("/");

// 启动
start();
