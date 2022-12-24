import axios from "axios";
import { API_URL } from "../config";
import { ITodoList, ITodoLists } from "../models/TodoList";
import authHeader from "../utils/auth-header";
import { Result } from "../utils/result";

class TodoListService {
    async create(list: ITodoList) {
        try {
            await axios
                .post(`${API_URL}/lists/`, {
                    title: list.title,
                    description: list.description
                }, {
                    headers: authHeader()
                })
        } catch(e) {
            return Result.BAD
        }

        return Result.OK
    }

    async update(list: ITodoList) {
        if(!list.id) {
            return Result.BAD
        }

        try {
            await axios
                .put(`${API_URL}/lists/${list.id}`, {
                    title: list.title,
                    description: list.description
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
                .delete(`${API_URL}/lists/${id}`, {
                    headers: authHeader()
                })
        } catch(e) {
            return Result.BAD
        }

        return Result.OK
    }

    async getAll() {
        return axios
            .get<ITodoLists>(`${API_URL}/lists/`, {
                headers: authHeader()
            })
    }
}

export default new TodoListService();