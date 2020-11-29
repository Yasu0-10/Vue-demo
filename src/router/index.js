import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 把路由当成一个插件来使用
// 模块化工程中 必须要用 Vue.use() 安装一下
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

let str = {
  name: 'zs'
}
// eslint-disable-next-line 
function test() {}

console.log(str)
