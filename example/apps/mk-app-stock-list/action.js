import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'
import utils from 'mk-utils'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        const pagination = this.metaAction.gf('data.pagination').toJS()
        this.load(pagination)
    }

    load = async (pagination, filter = { type: 1, status: 0 }) => {
        const response = await this.webapi.stock.init({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    isSelectAll = () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get('selected'))
    }

    selectAll = (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ current, pageSize }, filter)
    }

    selectType = (selectedKeys, info) => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        filter.type = selectedKeys[0]
        this.load(pagination, filter)
    }

    loopTreeChildren = data => {
        const internal = (data) => {
            if (!data) return null

            return data.map((item) => {
                if (item.children && item.children.length) {
                    return {
                        name: item.id,
                        component: 'Tree.TreeNode',
                        key: item.id,
                        title: item.name,
                        children: internal(item.children)
                    }
                }

                return {
                    name: item.id,
                    component: 'Tree.TreeNode',
                    key: item.id,
                    title: item.name
                }
            })
        }
        var ret = {
            _isMeta: true,
            value: internal(data)
        }
        return ret;
    }


    getSelectedCount = () => {
        var lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0)
            return 0

        var ret = lst.filter(o => !!o.get('selected')).size

        return ret
    }

    searchChange = (e) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.search = e.target.value
        this.load(pagination, filter)
    }

    showDisableChange = (e) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.status = e.target.checked ? undefined : 0
        this.load(pagination, filter)
    }

    batchMenuClick = (e) => {
        switch (e.key) {
            case 'del':
                this.batchDel()
                break
            case 'modify':
                this.batchModify()
                break
            case 'disable':
                this.batchDisable()
                break
            case 'enable':
                this.batchEnable()
                break
            
        }
    }

    batchModify = async () => {
        throw '请实现批量删除功能'
    }


    batchDel = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要删除的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要删除的存货')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stock.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    batchDisable = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要停用的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要停用的存货')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stock.disable({ ids })
        this.metaAction.toast('success', '停用成功')
        this.reload()
    }

    batchEnable = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0) {
            this.metaAction.toast('error', '请选中要启用的存货')
            return
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0) {
            this.metaAction.toast('error', '请选中要启用的存货')
            return
        }

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.stock.enable({ ids })
        this.metaAction.toast('success', '启用成功')
        this.reload()
    }

    del = (id) => async () => {
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return

        const ids = [id]
        await this.webapi.stock.del({ ids })
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    addType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个父分类')
            return
        }

        if(!this.config.apps['mk-app-stock-type-card']){
            throw '依赖mk-app-stock-type-card app,请使用mk clone mk-app-stock-type-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                parentId: type
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyType = async () => {
        const type = this.metaAction.gf('data.filter.type')

        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        if(!this.config.apps['mk-app-stock-type-card']){
            throw '依赖mk-app-stock-type-card app,请使用mk clone mk-app-stock-type-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-stock-type-card', {
                store: this.component.props.store,
                typeId: type
            })
        })
        if (ret) {
            this.reload()
        }
    }

    delType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.filter.type')
            const response = await this.webapi.stockType.del({ id })
            this.metaAction.toast('success', '删除类型成功')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination, { type: -1 })
        }
    }

    add = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        if(!this.config.apps['mk-app-stock-card']){
            throw '依赖mk-app-stock-card app,请使用mk clone mk-app-stockcard命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('mk-app-stock-card', {
                store: this.component.props.store,
                typeId: type
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modify = (id) => async () => {
        if(!this.config.apps['mk-app-stock-card']){
            throw '依赖mk-app-stock-card app,请使用mk clone mk-app-stock-card命令添加'
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('mk-app-stock-card', {
                store: this.component.props.store,
                id
            })
        })

        if (ret) {
            this.reload()
        }
    }

    print = () => {
        throw '请实现打印功能'
    }

    imp = () => {
        throw '请实现导入功能'
    }

    exp = () => {
        throw '请实现导出功能'
    }

    setting = () => {
        throw '请实现设置功能'
    }

    numberFormat = utils.number.format

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}