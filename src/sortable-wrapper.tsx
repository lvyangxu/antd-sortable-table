import * as React from 'react'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor, restrictToWindowEdges, restrictToParentElement } from '@dnd-kit/modifiers'
import { cloneDeep } from 'lodash'
import { addTableKey } from './util'
import { RowKeyType, TableEditorProps } from './type'

export function SortableWrapper(props: { children: React.ReactElement } & Pick<TableEditorProps<RowKeyType>, 'value' | 'onChange'>) {
    const { children, value, onChange } = props

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        })
    )

    let newValue = cloneDeep(value)
    const items = newValue.map((d) => d._sortKey.toString())
    const [activeId, setActiveId] = React.useState<string | null>(null)

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => {
                if (!active) {
                    return
                }

                setActiveId(active.id as string)
            }}
            onDragEnd={(e) => {
                const start: string = activeId
                const end: string = e.over.id as string

                if (start !== end) {
                    const o = newValue.findIndex((d) => d._sortKey.toString() === start)
                    const n = newValue.findIndex((d) => d._sortKey.toString() === end)
                    newValue = arrayMove(newValue, o, n)
                    addTableKey(newValue)
                    onChange(newValue)
                }
            }}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement, restrictToFirstScrollableAncestor]}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    )
}
