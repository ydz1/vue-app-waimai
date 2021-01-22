import Vue from 'vue'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORY, RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO, RECEIVE_SHOPGOODS, RECEIVE_SHOPRATINGS, RECEIVE_SHOPINFO, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, RECEIVE_SEARCH_SHOPS } from './mutation-types'
export default {
  [RECEIVE_ADDRESS] (state, { address }) {
    state.address = address
  },
  [RECEIVE_CATEGORY] (state, { category }) {
    state.category = category
  },
  [RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RESET_USERINFO] (state) {
    state.userInfo = {}
  },
  // 有关mock的数据
  [RECEIVE_SHOPGOODS] (state, { shopGoods }) {
    state.shopGoods = shopGoods
  },
  [RECEIVE_SHOPRATINGS] (state, { shopRatings }) {
    state.shopRatings = shopRatings
  },
  [RECEIVE_SHOPINFO] (state, { shopInfo }) {
    state.shopInfo = shopInfo
  },
  [INCREMENT_FOOD_COUNT] (state, { food }) {
    if (!food.count) {
      // food.count = 1
      Vue.set(food, 'count', 1) // 属性，属性名，属性值,该语法使得新增的属性也有数据绑定
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, { food }) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    state.cartFoods.forEach((food) => {
      food.count = 0
    })
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS] (state, { searchShops }) {
    state.searchShops = searchShops
  }
}
