/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    stock: {
        init: (option) => fetch.post('/v1/stock/init', option),
        query: (option) => fetch.post('/v1/stock/query', option),
        del: (option)  => fetch.post('/v1/stock/del', option),
        disable: (option)  => fetch.post('/v1/stock/disable', option),
        enable: (option)  => fetch.post('/v1/stock/enable', option),
    },
    stockType: {
        del: (option) => fetch.post('/v1/stockType/del', option)
    }
}