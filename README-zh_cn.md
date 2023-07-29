# antd-sortable-table
基于antd和dnd-kit封装的可拖动排序的表格编辑器

[English](./README.md) | 简体中文

## 何时使用

- 提供了一个可以编辑的表格，实现了常见的排序、新增行、复制行、删除行等场景

# demo

https://lvyangxu.github.io/antd-sortable-table/

## 📦 安装  

```shell

npm i antd-sortable-table -S

```

## API

```ts

import { ColumnsType, TableProps } from 'antd/es/table'

export type RowKeyType = {
    /** row index of value */
    _rowIndex?: number
    /** sortKey for dnd, don't change it */
    _sortKey?: number
} & object

export interface TableEditorProps<T extends RowKeyType> {
    /** element id, useful for antd form item */
    id?: string
    /** locale config, auto sync with antd locale, only support zh-cn and en */
    locale?: Locale
    /** antd table datasource,auto add _rowIndex (row index number) and _sortKey (used by sort) for every row */
    value?: T[]
    /** datasource change event */
    onChange?: (v: TableEditorProps<T>['value']) => void
    /** table editor state,control table should show edit dom */
    isPreview: boolean
    /** default value for a new row */
    defaultRowValueFunc: (v: TableEditorProps<T>['value']) => T
    /** a function return antd table columns */
    columnsFunc: (v: Required<Pick<TableEditorProps<T & RowKeyType>, 'value' | 'onChange'>>) => ColumnsType<T & RowKeyType>
    /** table edit validator,only trigger when some row add or delete */
    onEditValidator?: (v: { type: 'add' | 'delete'; value: TableEditorProps<T>['value'] }) => void
    /** control table row can be sorted,default true */
    sortable?: boolean
    /** force sort on preview state, useful for sort table row without change column data ,default false */
    forceSortable?: boolean
    /** antd table props */
    tableProps?: Omit<TableProps<T>, 'dataSource' | 'columns' | 'title' | 'rowKey'>
    /** copy tranform function, happen before copy a row to a new row */
    copyTransform?: (v: T) => T
}

export interface Locale {
    locale: 'zh-cn' | 'en'
    data: {
        sortColumnTitle: string
        actionColumnTitle: string
        copyButtonText: string
        deleteButtonText: string
        addButtonText: string
        clearButtonText: string
    }
}


```

| 参数 | 描述 | 类型 | 必须 | 默认值 | 示例 |
| -- | -- | -- | -- | -- | -- |
| id | 元素id，方便表单组件使用 | string | 否 | | "my-editor" |
| locale | 国际化，默认和antd的国际化设置同步，目前只做了简体中文和英文 | object | 否 |  |
| value | 表格的当前值，antd table的datasource | array | 否 | [] | {"aaa":"xxx","bbb":"xxx"} |
| onChange | value变化的回调 | function | 否 | |  |
| isPreview | 是否为预览，配合columns定制ui显示 | boolean | 是 | | false |
| defaultRowValueFunc | 新增一行时的默认值，参数为表格的当前值 | function | 是 | | |
| columnsFunc | 表格列的生成函数，json参数为表格当前值和变化回调 | function | 是 | | |
| onEditValidator | 表格行变化时的校验函数，如果不合法直接抛出异常，可以用来控制最大最小行数等等 | function | 否 | | |
| sortable | 编辑状态下是否开启排序，预览状态下没有排序 | boolean | 否 | true |  |
| forceSortable | 强制排序，在预览状态下也生效 | boolean | 否 | false |  |
| tableProps | 透传antd表格属性，dataSource、columns、caption、rowKey除外 | object | 否 | | |
| copyTransform | 复制一列前，对新一行的数据变换 | function | 否 | |  |


## 🔨 代码演示

[demo](./test/demo.tsx)

