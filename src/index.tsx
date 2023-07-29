import { ConfigProvider } from 'antd'
import * as React from 'react'
import { locale as en } from './locale/en'
import { locale as zhCN } from './locale/zh-cn'
import { RowKeyType, TableEditorProps } from './type'
import { InnerEditor } from './inner-editor'

const localeData = [
    { id: 'en', data: en },
    { id: 'zh-cn', data: zhCN },
]

export function TableEditor<T extends RowKeyType>(props: TableEditorProps<T>) {
    return (
        <ConfigProvider.ConfigContext.Consumer>
            {(data) => {
                const antdLocale = data.locale.locale
                const mylocale = localeData.find((d) => d.id === antdLocale)?.data

                return <InnerEditor<T> locale={mylocale} {...props} />
            }}
        </ConfigProvider.ConfigContext.Consumer>
    )
}
