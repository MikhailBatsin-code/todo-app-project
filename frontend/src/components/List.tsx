import { ITodoList } from "../models/TodoList";
import Button from "./Button";
import Card from "./Card";
import CardHeading from "./CardHeading";
import CardLink from "./CardLink";
import CardLinks from "./CardLinks";
import CardParagrapgh from "./CardParagraph";

interface ListProps {
    list: ITodoList
}

export default function List({ list }: ListProps) {
    return (
        <Card>
            <CardHeading>{ list.title }</CardHeading>
            <CardParagrapgh>{ list.description }</CardParagrapgh>
            <CardLinks>
                <CardLink 
                    href={ "/lists/" + list.id } 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Посмотреть</CardLink>
                <CardLink
                    href={ "/lists/delete/" + list.id }
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >&#128465;</CardLink>
                <CardLink
                    href={ "/lists/update/" + list.id }
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >&#9998;</CardLink>
            </CardLinks>
        </Card>
    )
}