interface HeadingProps {
    children: React.ReactNode
}

export default function CardHeading({ children }: HeadingProps) {
    return (
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            { children }
        </h5>
    )
}