import { DragOutlined } from '@ant-design/icons'
import Button from 'antd/es/button'
import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props) {
    const { index, children, ...others } = props
    if (index === undefined) {
        // 比如空数据时的情况
        return React.createElement('tr', props)
    }

    const id = index.toString()
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
    }

    return (
        <tr key={id} ref={setNodeRef} {...others} {...attributes} style={style}>
            {React.Children.map(children, (child) => {
                if (child.key === '_sortKey') {
                    return React.Children.map(child, (c, j) => {
                        if (j === 0) {
                            return React.cloneElement(c, {}, <Button icon={<DragOutlined />} data-cypress="draggable-handle" {...listeners} />)
                        }
                        return c
                    })
                }

                return child
            })}
        </tr>
    )
}
