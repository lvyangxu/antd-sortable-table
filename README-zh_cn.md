# antd-sortable-table
基于antd和dnd-kit封装的可拖动排序的表格编辑器

[English](./README.md) | 简体中文

## 何时使用

- 提供了一个可以编辑的表格，实现了常见的排序、新增行、复制行、删除行等场景

## 📦 安装  

```shell

npm i antd-sortable-table -S

```

## API

| 参数 | 描述 | ts类型 | 必须 | 默认值 | 示例 |
| -- | -- | -- | -- | -- | -- |
| id | 元素id，方便表单组件使用 | string | 否 | - | "my-editor" |
| locale | 国际化 | 


## 🔨 代码演示

```ts

import * as React from 'react'
import { Input, InputNumber } from 'antd'
import { cloneDeep } from 'lodash'
import { TableEditor } from '../src'

type R = { a: string; b: number }

export function Demo() {
    const [data, setData] = React.useState<R[]>([])

    return (
        <TableEditor<R>
            isPreview={false}
            defaultRowValueFunc={() => ({ a: '1', b: 1 })}
            value={data}
            onChange={(v) => {
                console.log(v)
                setData(v)
            }}
            columnsFunc={({ value, onChange }) => [
                {
                    title: 'column1',
                    render: (v, r) => (
                        <Input
                            value={r.a}
                            onChange={(e) => {
                                let newValue = cloneDeep(value)
                                newValue = newValue.map((d, i) => {
                                    if (r._rowIndex === i) {
                                        d.a = e.target.value.trim()
                                    }
                                    return d
                                })
                                onChange(newValue)
                            }}
                        />
                    ),
                },
                {
                    title: 'column2',
                    render: (v, r) => (
                        <InputNumber
                            value={r.b}
                            onChange={(v1) => {
                                let newValue = cloneDeep(value)
                                newValue = newValue.map((d, i) => {
                                    if (r._rowIndex === i) {
                                        d.b = v1
                                    }
                                    return d
                                })
                                onChange(newValue)
                            }}
                        />
                    ),
                },
            ]}
        />
    )
}



```

