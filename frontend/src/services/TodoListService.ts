import axios from "axios";
import { API_URL } from "../config";
import { ITodoLists } from "../models/TodoList";
import authHeader from "../utils/auth-header";

class TodoListService {
    create() {

    }

    update() {

    }

    delete() {

    }

    getAll() {
        return axios
            .get<ITodoLists>(API_URL+"/lists/", {
                headers: authHeader()
            })
    }

    getById() {

    }
}

export default new TodoListService();