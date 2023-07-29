import * as React from 'react'
import { Divider, Input, InputNumber, Switch } from 'antd'
import { cloneDeep } from 'lodash'
import { TableEditor } from '../src'

type T = { a: string; b: number }

export function Demo() {
    const [data, setData] = React.useState<T[]>([])
    const [isPreview, setIsPreview] = React.useState(false)

    return (
        <>
            <Switch
                checked={isPreview}
                onChange={(v) => {
                    setIsPreview(v)
                }}
            />
            <span>preview switch</span>
            <Divider />
            <TableEditor<T>
                isPreview={isPreview}
                defaultRowValueFunc={() => ({ a: '1', b: 1 })}
                value={data}
                onChange={(v) => {
                    console.log(v)
                    setData(v)
                }}
                columnsFunc={({ value, onChange }) => [
                    {
                        title: 'column1',
                        render: (v, r) => {
                            if (isPreview) {
                                return r.a
                            }

                            return (
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
                            )
                        },
                    },
                    {
                        title: 'column2',
                        render: (v, r) => {
                            if (isPreview) {
                                return r.b
                            }

                            return (
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
                            )
                        },
                    },
                ]}
            />
        </>
    )
}
