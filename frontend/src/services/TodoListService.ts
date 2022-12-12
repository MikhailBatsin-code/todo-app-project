import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import { ITodoList, ITodoLists } from "../models/TodoList";
import authHeader from "../utils/auth-header";

class TodoListService {
    async create(list: ITodoList) {
        try {
            await axios
                .post(API_URL+"/lists/", {
                    title: list.title,
                    description: list.description
                }, {
                    headers: authHeader()
                })
        } catch(e) {
            const error = e as AxiosError
            console.log(error);
            return false
        }

        return true
    }

    update() {

    }

    delete() {

    }

    async getAll() {
        return axios
            .get<ITodoLists>(API_URL+"/lists/", {
                headers: authHeader()
            })
    }

    getById() {

    }
}

export default new TodoListService();