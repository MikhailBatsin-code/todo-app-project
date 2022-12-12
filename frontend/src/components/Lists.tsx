import { ITodoList } from "../models/TodoList"
import List from "./List"

interface ListsProps {
    lists: ITodoList[]
}

export default function Lists({ lists }: ListsProps) {
    return (
        <div className="grid grid-cols-2 gap-1 mb-4">
            { lists.map(list => <List list={list} key={ list.id }/>) }
        </div>
    )
}