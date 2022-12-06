import AuthService from "../services/AuthService";

export default function authHeader() {
    const user = AuthService.getCurrentUser()

    if(user.token) {
        return {
            'Authorization': "Bearer " + user.token
        }
    }

    return {}
}