import { CloseOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { ConfigOptions } from 'antd/es/message/interface'
import { cloneDeep } from 'lodash'
import * as React from 'react'

export function getAutoincrId(jsonParam: { data: any[]; key: string }): number {
    const { data = [], key } = jsonParam
    if (data.length === 0) {
        return 1
    }
    return Math.max(...data.map((d1) => (d1[key] === undefined ? 0 : d1[key]))) + 1
}

export function addTableKey(value: any[]) {
    value.forEach((d, i) => {
        d._rowIndex = i
        if (d._sortKey === undefined) {
            const _sortKey = getAutoincrId({ data: value, key: '_sortKey' })
            d._sortKey = _sortKey
        }
    })
}

export function deleteArrayKey(data: any[]): any[] {
    if (data === undefined) {
        return []
    }

    const newData = cloneDeep(data)
    newData.forEach((d) => {
        delete d._rowIndex
        delete d._sortKey
    })
    return newData
}

export function deleteSortKey(data: any[]): any[] {
    if (data === undefined) {
        return []
    }

    const newData = cloneDeep(data)
    newData.forEach((d) => {
        delete d._sortKey
    })
    return newData
}

export function showMessageWithCloseIcon(jsonParam: {
    text: string
    duration?: ConfigOptions['duration']
    method: 'success' | 'info' | 'warn' | 'error' | 'warning'
}) {
    const { text, method, duration = 4.5 } = jsonParam
    const key = Date.now()
    message[method]({
        key,
        content: (
            <span>
                {text}
                <CloseOutlined
                    style={{ color: 'black' }}
                    onClick={() => {
                        message.destroy(key)
                    }}
                />
            </span>
        ),
        duration,
    })
}
