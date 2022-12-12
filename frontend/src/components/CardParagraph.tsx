interface CardParagrapghProps {
    children: React.ReactNode
}

export default function CardParagrapgh({ children }: CardParagrapghProps) {
    return (
        <p className="text-sm text-gray-500 dark:text-gray-400">
            { children }
        </p>
    )
}