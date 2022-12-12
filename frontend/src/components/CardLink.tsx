import { Link } from "react-router-dom"

interface CardLinkProps {
    children: React.ReactNode
    className: string
    href: string
}

export default function CardLink({ children, className, href }: CardLinkProps) {
    const classes = (
        "inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none " + className
    )

    return (
        <Link 
            className={classes}
            to={href}
        >
            { children }
        </Link>
    )
}