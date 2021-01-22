import { RECEIVE_ADDRESS, RECEIVE_CATEGORY, RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO, RECEIVE_SHOPGOODS, RECEIVE_SHOPRATINGS, RECEIVE_SHOPINFO, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, RECEIVE_SEARCH_SHOPS } from './mutation-types'
import { getAddress, getFoodTypes, getShopList, getUserInfo, loginOut, getShopGoods, getShopRatings, getShopInfo, getSearchShopList } from '../api/index'
export default {
  reqAddress ({ commit, state }) {
    const { latitude, longitude } = state
    const geohash = latitude + ',' + longitude
    getAddress(geohash).then(response => {
      if (response.code === 0) {
        const address = response.data
        commit(RECEIVE_ADDRESS, { address })
      }
    }).catch(() => {})
    // const result = await getAddress(geohash)
    // if (result.code === 0) {
    //   const address = result.data
    //   commit(RECEIVE_ADDRESS, { address })
    // }
  },
  async reqFoodTypes ({ commit }) {
    const result = await getFoodTypes()
    if (result.code === 0) {
      const category = result.data
      commit(RECEIVE_CATEGORY, { category })
    }
  },
  async reqShops ({ commit, state }) {
    const { latitude, longitude } = state
    const result = await getShopList(latitude, longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  reqUserInfo ({ commit }, userInfo) {
    commit(RECEIVE_USERINFO, { userInfo })
  },
  async autoLogin ({ commit }) {
    const result = await getUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, { userInfo })
    }
  },
  async logOut ({ commit }) {
    const result = await loginOut()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  },
  // 有关mock的数据
  async reqShopGoods ({ commit }, func) {
    const result = await getShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOPGOODS, { shopGoods })
      func && func()// 这样写可以处理func未传入的错误
    }
  },
  async reqShopRatings ({ commit }, callback) {
    const result = await getShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOPRATINGS, { shopRatings })
      callback && callback()
    }
  },
  async reqShopInfo ({ commit }, callback) {
    const result = await getShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOPINFO, { shopInfo })
      callback && callback()
    }
  },

  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) { // 增加的情况
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  clearCart ({ commit }) {
    commit(CLEAR_CART)
  },
  async reqSearchShop ({ commit, state }, keyword) {
    const { latitude, longitude } = state
    const geohash = latitude + ',' + longitude
    const result = await getSearchShopList(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
}
