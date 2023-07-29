import * as React from 'react'
import { Descriptions, Input, InputNumber } from 'antd'
import { cloneDeep } from 'lodash'
import { TableEditor } from '../src'

type T = { a: string; b: number }

export function Demo() {
    const [data, setData] = React.useState<T[]>([])

    return (
        <Descriptions column={1} bordered labelStyle={{ width: 200 }}>
            <Descriptions.Item label="editable">
                <TableEditor<T>
                    isPreview={false}
                    defaultRowValueFunc={() => ({ a: '1', b: 1 })}
                    value={data}
                    onChange={(v) => {
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
            </Descriptions.Item>
            <Descriptions.Item label="preview">
                <TableEditor<T>
                    isPreview
                    defaultRowValueFunc={() => ({ a: '1', b: 1 })}
                    value={data}
                    columnsFunc={() => [
                        {
                            title: 'column1',
                            render: (v, r) => r.a,
                        },
                        {
                            title: 'column2',
                            render: (v, r) => r.b,
                        },
                    ]}
                />
            </Descriptions.Item>
            <Descriptions.Item label="forceSortable">
                <TableEditor<T>
                    isPreview
                    forceSortable
                    defaultRowValueFunc={() => ({ a: '1', b: 1 })}
                    value={data}
                    onChange={(v) => {
                        setData(v)
                    }}
                    columnsFunc={() => [
                        {
                            title: 'column1',
                            render: (v, r) => r.a,
                        },
                        {
                            title: 'column2',
                            render: (v, r) => r.b,
                        },
                    ]}
                />
            </Descriptions.Item>
        </Descriptions>
    )
}
