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
