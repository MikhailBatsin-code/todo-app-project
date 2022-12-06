interface PageProps {
    children: React.ReactNode
}

export default function Page({children}: PageProps) {
    return (
        <main className="max-w-2xl container mx-auto pt-5 text-center">
            { children }
        </main>
    )
}