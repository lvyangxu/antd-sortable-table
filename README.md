# antd-sortable-table
antd table with dnd
an sortable table editor based on antd and dnd-kit

English | [简体中文](./README-zh_CN.md)

## When To Use

- You ne

## 📦 install  

```shell

npm i antd-sortable-table -S

```

## 🔨 useage

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

## api

| propName | description | type | required | exmaple |
| -- | -- | -- | -- | -- |
| 