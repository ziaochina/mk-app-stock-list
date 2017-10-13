/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import img1 from './img/img1.png'
import img2 from './img/img2.jpg'

const mockData = fetch.mockData

function initMockData() {
    //类型
    if (!mockData.stockCategories) {
        mockData.stockCategories = [{
            id: 1,
            name: '商品'
        }, {
            id: 2,
            name: '劳务'
        }]
    }

    //计价方式
    if (!mockData.pricingModes) {
        mockData.pricingModes = [{
            id: 1,
            name: '移动平均'
        }, {
            id: 2,
            name: '全月平均'
        }, {
            id: 3,
            name: '先进先出'
        }]
    }

    //分类
    if (!mockData.stockTypes) {
        mockData.stockTypes = [{
            id: 1,
            code: '001',
            name: '食品',
            children: [{
                id: 101,
                code: '00101',
                name: '肉类'
            }, {
                id: 102,
                code: '00102',
                name: '酒类'
            }, {
                id: 103,
                code: '00102',
                name: '干果'
            }]
        }, {
            id: 2,
            code: '002',
            name: '服饰',
            children: [{
                id: 201,
                code: '00201',
                name: '衣服'
            }, {
                id: 202,
                code: '00202',
                name: '鞋子'
            }, {
                id: 203,
                code: '00203',
                name: '饰品'
            }]
        }, {
            id: 3,
            code: '003',
            name: '设备',
        }]
    }

    //税率
    if (!mockData.taxRates) {
        mockData.taxRates = [{
            id: 17,
            name: '17%'
        }, {
            id: 5,
            name: '5%'
        }, {
            id: 3,
            name: '3%'
        }]
    }

    //计量单位
    if (!mockData.meaUnits) {
        mockData.meaUnits = [{
            id: 1,
            name: '个'
        }, {
            id: 2,
            name: '件'
        }, {
            id: 3,
            name: '台'
        }, {
            id: 4,
            name: '斤'
        }, {
            id: 5,
            name: '双'
        }]
    }

    //存货
    if (!mockData.stocks) {
        mockData.stocks = []

        for (let i = 1; i < 200; i++) {
            mockData.stocks.push({
                id: 1000 + i,
                code: 1000 + i + '',
                name: '肉' + i,
                memo: '肉' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 101,
                    code: '00101',
                    name: '肉类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 6; i++) {
            mockData.stocks.push({
                id: 2000 + i,
                code: 2000 + i + '',
                name: '酒' + i,
                memo: '酒' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 102,
                    code: '00102',
                    name: '酒类'
                },
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 10; i++) {
            mockData.stocks.push({
                id: 3000 + i,
                code: 3000 + i + '',
                name: '干果' + i,
                memo: '干果' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 103,
                    code: '00102',
                    name: '干果'
                }
                ,
                meaUnit: {
                    id: 4,
                    name: '斤'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 4,
                        name: '斤'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 34; i++) {
            mockData.stocks.push({
                id: 4000 + i,
                code: 4000 + i + '',
                name: '衣服' + i,
                memo: '衣服' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 201,
                    code: '00201',
                    name: '衣服'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 8; i++) {
            mockData.stocks.push({
                id: 5000 + i,
                code: 5000 + i + '',
                name: '鞋子' + i,
                memo: '鞋子' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 202,
                    code: '00202',
                    name: '鞋子'
                }
                ,
                meaUnit: {
                    id: 5,
                    name: '双'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 5,
                        name: '双'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 28; i++) {
            mockData.stocks.push({
                id: 6000 + i,
                code: 6000 + i + '',
                name: '饰品' + i,
                memo: '饰品' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 203,
                    code: '00203',
                    name: '饰品'
                }
                ,
                meaUnit: {
                    id: 2,
                    name: '件'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 2,
                        name: '件'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }

        for (let i = 1; i < 50; i++) {
            mockData.stocks.push({
                id: 7000 + i,
                code: 7000 + i + '',
                name: '设备' + i,
                memo: '设备' + i,
                category: {
                    id: 1,
                    name: '商品'
                },
                type: {
                    id: 3,
                    code: '003',
                    name: '设备',
                }
                ,
                meaUnit: {
                    id: 3,
                    name: '台'
                },
                spec: '',
                pricingMode: {
                    id: 2,
                    name: '全月平均'
                },
                taxRate: {
                    id: 17,
                    name: '17%'
                },
                multiMea: true,
                disable: false,
                units: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    conversionRate: 1,
                    conversionDesc: '',
                    isBase: true,
                    isPu: true,
                    isSa: true,
                    isSt: true
                }],
                prices: [{
                    id: 1,
                    unit: {
                        id: 3,
                        name: '台'
                    },
                    lastPuPrice: 10,
                    referPuPrice: 10,
                    lastSaPrice: 20,
                    retailPrice: 20,
                    firstTradePrice: 11,
                    secondTradePrice: 12,
                    thirdTradePrice: 13
                }],
                imgs: [{
                    id: 1,
                    url: img1
                }, {
                    id: 2,
                    url: img2
                }]
            })
        }
    }

}


fetch.mock('/v1/stockList/init', (option) => {
    initMockData()
    var ret = query(option)
    ret.value.stockTypes = mockData.stockTypes
    return ret
})

fetch.mock('/v1/stockType/query', (option) => {
    initMockData()
    return mockData.stockTypes
})

fetch.mock('/v1/stockList/query', (option) => {
    initMockData()
    return query(option)
})

function query(option) {
    const { pagination, filter } = option

    var data = mockData.stocks

    if (filter) {
        if (filter.type && filter.type.id) {
            data = data.filter(o => {
                if (!o.type || !o.type.id)
                    return true
                let typeId = o.type.id + ''
                return typeId.substr(0, filter.type.id.toString().length) == filter.type.id
            })
        }

        if (filter.search) {
            data = data.filter(o => o.code.indexOf(filter.search) != -1
                || o.name.indexOf(filter.search) != -1)
        }

        if (filter.showDisable !== true) {
            data = data.filter(o => !o.disable)
        }

    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current

    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }

    return ret
}


fetch.mock('/v1/stockType/del', (option) => {
    initMockData()
    const del = (types) => {
        types.forEach((t, index) => {
            if (t.id == option.id) {
                types.splice(index, 1)
                return true
            } else if (t.children) {
                del(t.children)
            }
        })
    }
    del(mockData.stockTypes)

    return { result: true, value: true }
})


fetch.mock('/v1/stockList/del', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let index = mockData.stocks.findIndex(o => o.id == id)

        if (index || index === 0)
            mockData.stocks.splice(index, 1)
    })

    return { result: true, value: true }
})


fetch.mock('/v1/stockList/disable', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let stock = mockData.stocks.find(o => o.id == id)
        stock.disable = true
    })

    return { result: true, value: true }
})

fetch.mock('/v1/stockList/enable', (option) => {
    initMockData()
    option.ids.forEach(id => {
        let stock = mockData.stocks.find(o => o.id == id)
        stock.disable = false
    })

    return { result: true, value: true }
})