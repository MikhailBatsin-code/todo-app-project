interface CardLinksProps {
    children: React.ReactNode
}

export default function CardLinks({ children }: CardLinksProps) {
    return (
        <div className="flex mt-4 space-x-3 md:mt-6">
            { children }
        </div>
    )
}