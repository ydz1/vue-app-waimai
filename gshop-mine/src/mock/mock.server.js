import Mock from 'mockjs'
import data from './data'

// 返回goods接口
// 返回ratings接口
// 返回info接口
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })

// 此文件不需要向外暴露
