import { MouseEventHandler } from "react"

interface ButtonProps {
    text: string
    type?: "button" | "submit" | "reset"
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({text, className, onClick, type}: ButtonProps) {
    return <button 
        type={type ? type : "button"}
        className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " + className}
        onClick={onClick}
    >{text}</button>
}