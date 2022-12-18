import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import { ITodoList, ITodoLists } from "../models/TodoList";
import authHeader from "../utils/auth-header";

// to understand why returnin true or false
const OK = true
const BAD = false

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
            return BAD
        }

        return OK
    }

    async update(list: ITodoList) {
        if(!list.id) {
            return BAD
        }

        try {
            await axios
                .put(API_URL+"/lists/"+list.id, {
                    title: list.title,
                    description: list.description
                }, {
                    headers: authHeader()
                })
        } catch(e) {
            console.log(e);
            return BAD
        }

        return OK
    }

    async delete(id: string) {
        try {
            await axios
                .delete(API_URL+"/lists/"+id, {
                    headers: authHeader()
                })
        } catch(e) {
            return BAD
        }

        return OK
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