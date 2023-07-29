# antd-sortable-table
antd table with dnd
an sortable table editor based on antd and dnd-kit

English | [简体中文](./README-zh_cn.md)

## When To Use

- Provides an editable table that implements common scenarios such as sorting, adding rows, copying rows, deleting rows, etc.

# demo

https://lvyangxu.github.io/antd-sortable-table/

## 📦 Install  

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

| parameter | description | type | required | default | example |
| -- | -- | -- | -- | -- | -- |
| id | element id, convenient for form components | string | no | | "my-editor" |
| locale | Internationalization, the default is synchronized with antd's internationalization settings, currently only Simplified Chinese and English | object | No | |
| value | the current value of the table, the datasource of antd table | array | no | [] | {"aaa":"xxx","bbb":"xxx"} |
| onChange | callback for value change | function | no | | |
| isPreview | Whether it is a preview, with columns to customize the ui display | boolean | yes | | false |
| defaultRowValueFunc | The default value when adding a row, the parameter is the current value of the table | function | yes | | |
| columnsFunc | generating function of table columns, the json parameter is the current value of the table and the change callback | function | is | | |
| onEditValidator | The validation function when the table row changes, if it is illegal, it will throw an exception directly, it can be used to control the maximum and minimum number of rows, etc. | function | No | | |
| sortable | Whether to enable sorting in the edit state, not in the preview state | boolean | No | true | |
| forceSortable | Forced sorting, also valid in the preview state | boolean | no | false | |
| tableProps | Transparent transmission of antd table properties, except dataSource, columns, caption, rowKey | object | No | | |
| copyTransform | Before copying a column, transform the data of a new row | function | No | | |

## 🔨 code demo

[demo](./test/demo.tsx)
