import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoItemService from "../../services/TodoItemService";
import { ITodoItem } from "../../models/TodoItem";
import { AxiosError } from "axios";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Items from "../../components/Items";

export function List() {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<ITodoItem[]>()
    const [error, setError] = useState('')
    const { id } = useParams()

    async function fetchItems() {
        if(id){
            setLoading(true)
            try {
                const result = await TodoItemService.getAll(id)
                setItems(result.data.data)
            } catch(e) {
                const error = e as AxiosError
                setError(error.message)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    if(loading) {
        return <Loading/>
    }

    return (
        <div className="shadow border p-2">
            {
                error &&
                <p className="text-center text-lg text-red-600 italic">{ error }</p>
            }

            <div className="border-b-2 border-black flex flex-row justify-between">
                <p className="text-left">Количество списков: <span>{ items ? items.length : 0 }</span></p>
                <a href={`/lists/${id}/item/create`}><Button className="mb-[0.5px] py-2 px-4" text="+" /></a>
            </div>

            <div className="mt-1">
                { items ? <Items items={items}/> : <p>У вас еще нету предметов в списке.</p> }
            </div>
        </div>
    )
}