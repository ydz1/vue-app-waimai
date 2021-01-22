import ajax from './ajax'
// const BASEURL = 'http://localhost:4000'
const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
export const getAddress = (geohash) => {
  return ajax(`${BASE_URL}/position/${geohash}`)
}
// 2、获取食品分类列表
export const getFoodTypes = () => {
  return ajax(BASE_URL + '/index_category')
}
// 3、根据经纬度获取商铺列表
export const getShopList = (latitude, longitude) => {
  return ajax(BASE_URL + '/shops', { latitude, longitude })
}
// 4、根据经纬度和关键字搜索商铺列表
export const getSearchShopList = (geohash, keyword) => {
  return ajax(BASE_URL + '/search_shops', { geohash, keyword })
}
// 5、获取一次性验证码
export const getCaptcha = () => {
  return ajax(BASE_URL + '/captcha')
}
// 6、用户名密码登陆
export const login = (name, pwd, captcha) => {
  return ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
}
// 7、发送短信验证码
export const getMessageCaptcha = (phone) => {
  return ajax(BASE_URL + '/sendcode', { phone })
}
// 8、手机号验证码登陆
export const loginByPhone = (phone, code) => {
  return ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
}
// 9、根据会话获取用户信息
export const getUserInfo = () => {
  return ajax(BASE_URL + '/userinfo')
}
// 10、用户登出
export const loginOut = () => {
  return ajax(BASE_URL + '/logout')
}

// 关于mock写的接口
// 获取商品信息
export const getShopGoods = () => {
  return ajax('/goods')
}
// 获取评论信息
export const getShopRatings = () => {
  return ajax('/ratings')
}
// 获取商家信息
export const getShopInfo = () => {
  return ajax('/info')
}
