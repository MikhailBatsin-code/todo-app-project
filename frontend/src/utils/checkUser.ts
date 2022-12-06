import AuthService from "../services/AuthService";

export function checkUser() {
    const user = AuthService.getCurrentUser()

    return user !== null && user.username !== null
}