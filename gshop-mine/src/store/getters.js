export default {
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count * food.price
    }, 0)
  },
  positiveSize (state) {
    return state.shopRatings.reduce((preTotal, rating) => {
      return preTotal + (rating.rateType === 0 ? 1 : 0)
    }, 0)
  }
}
