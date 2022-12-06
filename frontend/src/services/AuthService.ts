import { AUTH_API_URL } from "../config"
import axios from 'axios'
import { ILoginInput, IRegisterInput, IStoredCredentials } from "../models/User"
import { IAuthResponse, IRegisterResponse } from "../models/Response"

class AuthService {
    login(user: ILoginInput) {
        return axios
            .post<IAuthResponse>(AUTH_API_URL+"/sign-in", {
                "username": user.username,
                "password": user.password
            })
            .then(response => {
                if(response.data.token) {
                    const data = {
                        "token": response.data.token,
                        "username": user.username
                    }
                    localStorage.setItem("user", JSON.stringify(data))

                    return true
                }
            })
            .catch(error => {
                if(error.response) {
                    return error.response
                }
            })
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(user: IRegisterInput) {
        return axios
            .post<IRegisterResponse>(AUTH_API_URL+"/sign-up", {
                "name": user.name,
                "username": user.username,
                "password": user.password
            })
            .then(response => {
                if(response.data.id) {
                    return true
                }
                return false
            })
            .catch(error => {
                console.log(error);
                
                if(error.response) {
                    return error.response
                }
            })
    }

    getCurrentUser(): IStoredCredentials {
        const user = localStorage.getItem("user")
        return user ? JSON.parse(user) : null
    }
}

export default new AuthService()