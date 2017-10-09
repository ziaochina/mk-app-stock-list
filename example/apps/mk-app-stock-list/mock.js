/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initStocks() {
    if (mockData.stockTypes && mockData.stockTypes.length > 0)
        return

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

    mockData.stocks = []

    for (let i = 1; i < 200; i++) {
        mockData.stocks.push({
            id: 1000 + i,
            code: 1000 + i + '',
            name: '肉' + i,
            type: 101,
            unit: {
                id: 1,
                name: '斤'
            },
            retailPrice: 5.21,
            buyingPrice: 3.00,
            cost: 3.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 6; i++) {
        mockData.stocks.push({
            id: 2000 + i,
            code: 2000 + i + '',
            name: '酒' + i,
            type: 102,
            unit: {
                id: 2,
                name: '瓶'
            },
            retailPrice: 100.98,
            buyingPrice: 50.00,
            cost: 50.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 10; i++) {
        mockData.stocks.push({
            id: 3000 + i,
            code: 3000 + i + '',
            name: '干果' + i,
            type: 103,
            unit: {
                id: 1,
                name: '斤'
            },
            retailPrice: 10.18,
            buyingPrice: 5.00,
            cost: 5.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 34; i++) {
        mockData.stocks.push({
            id: 4000 + i,
            code: 4000 + i + '',
            name: '衣服' + i,
            type: 201,
            unit: {
                id: 3,
                name: '件'
            },
            retailPrice: 211.28,
            buyingPrice: 80.00,
            cost: 80.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 8; i++) {
        mockData.stocks.push({
            id: 5000 + i,
            code: 5000 + i + '',
            name: '鞋子' + i,
            type: 202,
            unit: {
                id: 4,
                name: '双'
            },
            retailPrice: 198.18,
            buyingPrice: 90.00,
            cost: 90.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 28; i++) {
        mockData.stocks.push({
            id: 6000 + i,
            code: 6000 + i + '',
            name: '饰品' + i,
            type: 203,
            unit: {
                id: 3,
                name: '件'
            },
            retailPrice: 6.00,
            buyingPrice: 3.00,
            cost: 3.00,
            status: 0 //0 启用 1 停用
        })
    }

    for (let i = 1; i < 50; i++) {
        mockData.stocks.push({
            id: 7000 + i,
            code: 7000 + i + '',
            name: '设备' + i,
            type: 3,
            unit: {
                id: 5,
                name: '台'
            },
            retailPrice: 658.00,
            buyingPrice: 200.00,
            cost: 200.00,
            status: 0 //0 启用 1 停用
        })
    }
}


fetch.mock('/v1/stock/init', (option) => {
    var ret = query(option)
    ret.value.stockTypes = mockData.stockTypes
    return ret
})

fetch.mock('/v1/stockType/query', (option) => {
    initStocks()
    return mockData.stockTypes
})

fetch.mock('/v1/stock/query', (option) => {
    return query(option)
})

function query(option) {
    initStocks()

    const { pagination, filter } = option

    var data = mockData.stocks

    if (filter) {
        if (filter.type) {
            data = data.filter(o => {
                return o.type.toString().substr(0, filter.type.toString().length) == filter.type
            })
        }

        if (filter.search) {
            data = data.filter(o => o.code.indexOf(filter.search) != -1
                || o.name.indexOf(filter.search) != -1)
        }

        if(filter.status || filter.status == 0) {
             data = data.filter(o => o.status == filter.status)
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


fetch.mock('/v1/stock/del', (option) => {
    option.ids.forEach(id => {
        let index = mockData.stocks.findIndex(o => o.id == id)

        if (index || index === 0)
            mockData.stocks.splice(index, 1)
    })

    return { result: true, value: true }
})


fetch.mock('/v1/stock/disable', (option) => {
    option.ids.forEach(id => {
        let stock = mockData.stocks.find(o => o.id == id)
        stock.status = 1
    })

    return { result: true, value: true }
})

fetch.mock('/v1/stock/enable', (option) => {
    option.ids.forEach(id => {
        let stock = mockData.stocks.find(o => o.id == id)
        stock.status = 0
    })

    return { result: true, value: true }
})