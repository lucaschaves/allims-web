import { useState } from "react";

interface IDragInDrop {
    defaultItems: any[];
}

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
};

const useDragInDrop = ({ defaultItems }: IDragInDrop) => {
    const [dragAndDrop, setDragAndDrop] = useState<any>(initialDnDState);
    const [list, setList] = useState(defaultItems);

    const onDragStart = (event: any) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list,
        });
        event.dataTransfer.setData("text/html", "");
    };

    const onDragOver = (event: any) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder as any[];
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(event.currentTarget.dataset.position);
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter(
            (item, index) => index !== draggedFrom
        );
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo),
        ];
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo,
            });
        }
    };

    const onDrop = (event: any) => {
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false,
        });
    };

    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null,
        });
    };

    const addItemsDragInDrop = (it: any[]) => {
        setList(it);
    };

    return {
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
        addItemsDragInDrop,
        itemsDragInDrop: list,
        dragAndDrop,
    };
};

export { useDragInDrop };
