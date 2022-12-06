import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1 className="text-4xl">Список дел</h1>
            <p>
                Простое REST api веб-приложение с таким <Link to="/about" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">стеком</Link>
            </p>
        </>
    )
}