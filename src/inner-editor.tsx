import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Button from 'antd/es/button'
import Table, { ColumnsType, TableProps } from 'antd/lib/table'
import * as React from 'react'
import { cloneDeep } from 'lodash'
import { addTableKey, deleteArrayKey, getAutoincrId, showMessageWithCloseIcon } from './util'
import { RowKeyType, TableEditorProps } from './type'
import { SortableWrapper } from './sortable-wrapper'
import { SortableItem } from './sortable-item'
import { locale as en } from './locale/en'

const tableComponents: TableProps<RowKeyType>['components'] = {
    body: {
        row: (p) => <SortableItem {...p} />,
    },
}

/** inner table editor */
export function InnerEditor<T extends RowKeyType>(props: TableEditorProps<T>) {
    const {
        id,
        locale = en,
        value = [],
        onChange: onChange1,
        isPreview,
        columnsFunc,
        defaultRowValueFunc,
        onEditValidator,
        sortable = true,
        forceSortable = false,
        tableProps,
        copyTransform,
    } = props

    const onChange = (v) => {
        const v1 = deleteArrayKey(v)
        onChange1(v1)
    }
    const valueInner = cloneDeep(value)
    addTableKey(valueInner)

    const needSort = forceSortable || (sortable && !isPreview)

    let columns: ColumnsType<T> = []
    if (needSort) {
        columns.push({
            // 通过child.key可以取到值_sortKey
            dataIndex: '_sortKey',
            title: locale.data.sortColumnTitle,
            width: 60,
            filterDropdown: undefined,
            sorter: undefined,
        })
    }
    const c1 = columnsFunc({ value, onChange })

    columns = columns.concat(c1)
    if (!isPreview) {
        columns.push({
            title: locale.data.actionColumnTitle,
            filterDropdown: undefined,
            sorter: undefined,
            render: (v, r) => (
                <Space>
                    <Button
                        icon={<CopyOutlined />}
                        size="small"
                        onClick={() => {
                            const newValue = cloneDeep(valueInner)
                            if (onEditValidator !== undefined) {
                                try {
                                    onEditValidator({ type: 'add', value: newValue })
                                } catch (e) {
                                    showMessageWithCloseIcon({ text: e.message, method: 'error' })
                                    return
                                }
                            }
                            let newRow = cloneDeep(r)
                            newRow._sortKey = getAutoincrId({ data: newValue, key: '_sortKey' })
                            if (copyTransform !== undefined) {
                                newRow = copyTransform(newRow)
                            }

                            newValue.splice(r._rowIndex + 1, 0, newRow)
                            addTableKey(newValue)
                            onChange(newValue)
                        }}
                    >
                        {locale.data.copyButtonText}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => {
                            let newValue = cloneDeep(valueInner)
                            if (onEditValidator !== undefined) {
                                try {
                                    onEditValidator({ type: 'delete', value: newValue })
                                } catch (e) {
                                    showMessageWithCloseIcon({ text: e.message, method: 'error' })
                                    return
                                }
                            }
                            newValue = newValue.filter((d1, i) => i !== r._rowIndex)
                            addTableKey(newValue)
                            onChange(newValue)
                        }}
                    >
                        {locale.data.deleteButtonText}
                    </Button>
                </Space>
            ),
        })
    }

    let titleProps: TableProps<T> = {}
    if (!isPreview) {
        titleProps = {
            caption: (
                <Space style={{ width: '100%', marginBottom: 10 }}>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => {
                            const newValue = cloneDeep(valueInner)
                            if (onEditValidator !== undefined) {
                                try {
                                    onEditValidator({ type: 'add', value: newValue })
                                } catch (e) {
                                    showMessageWithCloseIcon({ text: e.message, method: 'error' })
                                    return
                                }
                            }

                            const rowValue = defaultRowValueFunc(newValue)
                            newValue.push(rowValue)
                            onChange(newValue)
                        }}
                    >
                        {locale.data.addButtonText}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            onChange([])
                        }}
                    >
                        {locale.data.clearButtonText}
                    </Button>
                </Space>
            ),
        }
    }

    const allTableProps: TableProps<T> = {
        dataSource: valueInner,
        columns,
        rowKey: '_rowIndex',
        ...titleProps,
        ...tableProps,
    }

    if (needSort) {
        allTableProps.components = tableComponents
        allTableProps.onRow = (r) => {
            const attr = {
                index: r._sortKey,
            }
            return attr as React.HTMLAttributes<any>
        }
    }

    let wc = <Table<T> {...allTableProps} />

    if (needSort) {
        wc = (
            <SortableWrapper value={valueInner} onChange={onChange}>
                {wc}
            </SortableWrapper>
        )
    }

    return <span id={id}>{wc}</span>
}
