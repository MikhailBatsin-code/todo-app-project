interface CardProps {
    children: React.ReactNode
}

export default function Card({children}: CardProps) {
    return (
        <div 
            className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-2xl dark:border-gray-700 dark:bg-gray-800"
        >
            {children}
        </div>
    )
}