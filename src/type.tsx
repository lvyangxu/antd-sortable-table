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
    defaultRowValueFunc?: (v: TableEditorProps<T>['value']) => T
    /** a function return antd table columns */
    columnsFunc: (v: Required<Pick<TableEditorProps<T & RowKeyType>, 'value' | 'onChange'>>) => ColumnsType<T & RowKeyType>
    /** table edit validator,only trigger when some row add or delete */
    onEditValidator?: (v: { type: 'add' | 'delete'; value: TableEditorProps<T>['value'] }) => void
    /** control table row can be sorted,default true */
    sortable?: boolean
    /** force sort on preview state, useful for sort table row without change column data ,default false */
    forceSortable?: boolean
    /** antd table props */
    tableProps?: Omit<TableProps<T>, 'dataSource' | 'columns' | 'caption' | 'rowKey'>
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
        requireDefaultRowValueFuncText: string
    }
}
