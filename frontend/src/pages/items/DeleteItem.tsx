import { Navigate, useParams } from "react-router-dom";
import TodoItemService from "../../services/TodoItemService";
import { useEffect } from "react";

export function DeleteItem() {
    const { id } = useParams()

    function deleteItem() {
        if(id) {
            TodoItemService.delete(id)
        }
    }

    useEffect(() => {
        deleteItem()
    })
    
    return (
        <Navigate to="/lists"/>
    )
}