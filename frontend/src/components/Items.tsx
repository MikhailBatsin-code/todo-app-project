import { ITodoItem } from "../models/TodoItem"
import Item from "./Item"

interface ItemsProps {
    items: ITodoItem[]
}

export default function Items({items}: ItemsProps) {
    return (
        <div className="grid grid-cols-2 gap-1 mb-4">
            { items.map(item => <Item item={item} key={ item.id }/>) }
        </div>
    )
}