export interface ITodoList {
    id?: number
    title: string
    description: string
}

export interface ITodoLists {
    data: ITodoList[]
}