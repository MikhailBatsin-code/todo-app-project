import axios from "axios";
import { ITodoItem, ITodoItems } from "../models/TodoItem";
import { API_URL } from "../config";
import authHeader from "../utils/auth-header";
import { Result } from "../utils/result";

class TodoItemService {
    async create(item: ITodoItem, id: string) {
        try {
            await axios
                .post(`${API_URL}/lists/${id}/items/`, {
                    title: item.title,
                    description: item.description
                }, {
                    headers: authHeader()
                })
        } catch(e) {
            return Result.BAD
        }

        return Result.OK
    }

    async update(item: ITodoItem) {
        if(!item.id) {
            return Result.BAD
        }

        try {
            await axios
                .put(`${API_URL}/items/${item.id}`, {
                    title: item.title,
                    description: item.description,
                    done: item.done
                }, {
                    headers: authHeader()
                })
        } catch(e) {
            return Result.BAD
        }

        return Result.OK
    }

    async delete(id: string) {
        try {
            await axios 
                .delete(`${API_URL}/items/${id}`, {
                    headers: authHeader()
                })
        } catch(e) {
            return Result.BAD
        }

        return Result.OK
    }

    async getAll(listId: string) {
        return axios
            .get<ITodoItems>(`${API_URL}/lists/${listId}/items/`, {
                headers: authHeader()
            })
    }
}

export default new TodoItemService();