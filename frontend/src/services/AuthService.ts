import { AUTH_API_URL } from "../config"
import axios from 'axios'
import { ILoginInput, IRegisterInput, IStoredCredentials } from "../models/User"
import { IAuthResponse, IRegisterResponse } from "../models/Response"

class AuthService {
    async login(user: ILoginInput) {
        try {
            const result = await axios.post<IAuthResponse>(AUTH_API_URL+"/sign-in", {
                "username": user.username,
                "password": user.password
            })
            const data = {
                "token": result.data.token,
                "username": user.username,
            }
            localStorage.setItem("user", JSON.stringify(data))
        } catch(e) {
            console.log(e);
            return false
        }

        return true
    }

    logout() {
        localStorage.removeItem("user")
    }

    async register(user: IRegisterInput) {
        try {
            await axios
                .post<IRegisterResponse>(AUTH_API_URL+"/sign-up", {
                    "name": user.name,
                    "username": user.username,
                    "password": user.password
                })
        } catch(e) {
            console.log(e);
            return false
        }

        return true
    }

    getCurrentUser(): IStoredCredentials {
        const user = localStorage.getItem("user")
        return user ? JSON.parse(user) : null
    }
}

export default new AuthService()