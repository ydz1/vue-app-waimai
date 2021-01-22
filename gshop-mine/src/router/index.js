import Vue from 'vue'
import VueRouter from 'vue-router'
// 上面这种写法是路由懒加载
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
// import Home from '../pages/Home/Home'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Personal from '../pages/Personal/Personal'
const Home = () => import('../pages/Home/Home')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')
const Personal = () => import('../pages/Personal/Personal')

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/home', component: Home, meta: { isShow: true } }, // 返回路由组件的函数,只有在执行该函数时才会加载路由组件，该函数在请求对应的路由路径时才执行
    { path: '/search', component: Search, meta: { isShow: true } },
    { path: '/order', component: Order, meta: { isShow: true } },
    { path: '/personal', component: Personal, meta: { isShow: true } },
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    {
      path: '/shop',
      component: Shop,
      children: [
        { path: 'goods', component: ShopGoods },
        { path: 'info', component: ShopInfo },
        { path: 'ratings', component: ShopRatings },
        { path: '', redirect: 'goods' }
      ]
    }
  ]
})
