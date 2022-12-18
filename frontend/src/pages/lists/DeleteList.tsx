import { useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import TodoListService from "../../services/TodoListService"

export function DeleteList() {
    const { id } = useParams()

    function deleteList() {
        if(id) {
            TodoListService.delete(id)
        }
    }

    useEffect(() => {
        deleteList()
    })
    
    return (
        <Navigate to="/lists"/>
    )
}