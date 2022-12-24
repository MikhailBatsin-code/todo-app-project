import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Lists from "../../components/Lists"
import { ITodoList } from "../../models/TodoList"
import TodoListService from "../../services/TodoListService"
import Loading from "../../components/Loading"

export default function AllLists() {
    const [loading, setLoading] = useState(false)
    const [lists, setLists] = useState<ITodoList[]>()
    const [error, setError] = useState("")

    async function fetchLists() {
        setLoading(true)
        try {
            const result = await TodoListService.getAll()
            setLists(result.data.data)
        } catch(e) {
            const error = e as AxiosError
            setError(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchLists()
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
                <p className="text-left">Количество списков: <span>{ lists ? lists.length : 0 }</span></p>
                <a href="/lists/create"><Button className="mb-[0.5px] py-2 px-4" text="+" /></a>
            </div>

            <div className="mt-1">
                { lists ? <Lists lists={lists}/> : <p>У вас еще нету списков дел.</p> }
            </div>
        </div>
    )
}