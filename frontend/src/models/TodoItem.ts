export interface ITodoItem {
    id?: number
    title: string
    description: string
    done: boolean
}

export interface ITodoItems {
    data: ITodoItem[]
}