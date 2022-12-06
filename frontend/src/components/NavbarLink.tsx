import { NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";

interface NavbarLinkProps {
    text: string
    to: string
    authOnly?: boolean
}

export default function NavbarLink({text, to, authOnly}: NavbarLinkProps) {
    const baseClasses = "block py-2 pl-3 pr-4 md:p-0 "
    const activeClasses = baseClasses + "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white"
    const inactiveClasses = baseClasses + "text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    const code = (
        <NavLink 
            to={to} 
            className={({isActive}) => 
                isActive ? activeClasses : inactiveClasses
            }
        >{text}</NavLink>
    )
    const user = AuthService.getCurrentUser()

    if(!authOnly) {
        return code
    }

    if(user && user.username) {
        return code
    }

    return <></>
}