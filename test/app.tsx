import * as React from 'react'
import { Card, ConfigProvider, Form, Radio } from 'antd'
import en from 'antd/locale/en_US'
import zh_CN from 'antd/locale/zh_CN'
import { Demo } from './demo'

export function App() {
    const [locale, setLocale] = React.useState(en)

    return (
        <ConfigProvider locale={locale}>
            <Card>
                <Form.Item label="lang">
                    <Radio.Group
                        value={locale}
                        onChange={(e) => {
                            setLocale(e.target.value)
                        }}
                    >
                        <Radio value={en}>en</Radio>
                        <Radio value={zh_CN}>中文</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="demo">
                    <Demo />
                </Form.Item>
            </Card>
        </ConfigProvider>
    )
}
