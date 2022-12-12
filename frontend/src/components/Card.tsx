interface CardProps {
    children: React.ReactNode
}

export default function Card({children}: CardProps) {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pt-10 pb-10">
                { children }
            </div>
        </div>
    )
}