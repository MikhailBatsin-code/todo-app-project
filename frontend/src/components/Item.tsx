import { ITodoItem } from "../models/TodoItem";
import Card from "./Card";
import CardHeading from "./CardHeading";
import CardLink from "./CardLink";
import CardLinks from "./CardLinks";
import CardParagrapgh from "./CardParagraph";

interface ItemProps {
    item: ITodoItem
}

export default function Item({item}: ItemProps) {
    return (
        <Card>
            <CardHeading>{ item.title }</CardHeading>
            <CardParagrapgh>{ item.description }</CardParagrapgh>
            <CardParagrapgh>{ item.done ? "сделано" : "не сделано" }</CardParagrapgh>
            <CardLinks>
                <CardLink
                    href={ `/items/delete/${item.id}` }
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >&#128465;</CardLink>
                <CardLink
                    href={ `/items/update/${item.id}` }
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >&#9998;</CardLink>
            </CardLinks>
        </Card>
    )
}