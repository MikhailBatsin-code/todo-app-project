import { MouseEvent, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";
import Button from "./Button";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
    const user = AuthService.getCurrentUser()
    let navbarBtns: ReactNode

    if(user !== null && user.username !== null) {
        const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
            AuthService.logout()
            window.location.reload()
        }

        navbarBtns = (
            <>
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{ user.username }</span>
                <Button text="выйти" className="ml-2" onClick={clickHandler}/>
            </>
        )
    } else {
        navbarBtns = (
            <>
                <Link to="/auth/sign-up">
                    <Button text="создать"/>
                </Link>
                <Link to="/auth/sign-in">
                    <Button text="войти" className="ml-1"/>
                </Link>
            </>
        )
    }

    return (      
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
            <NavLink to="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Список дел</span>
            </NavLink>
            <div className="flex md:order-2">
                { navbarBtns }
                <button 
                    data-collapse-toggle="navbar-sticky" 
                    type="button" 
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-sticky" 
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul className="flex flex-row p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <NavbarLink to="/about" text="о приложении"/>
                    </li>
                    { user !== null && user.username !== null && 
                    <>
                        <li>
                            <NavbarLink to="/lists" text="к спискам"/>
                        </li>
                    </> 
                    }
                </ul>
            </div>
        </div>
    </nav>
    )
}