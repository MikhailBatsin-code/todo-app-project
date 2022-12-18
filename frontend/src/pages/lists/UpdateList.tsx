import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import { FormEvent, useState } from "react";
import { ChangeEvent, IStatus } from "../../utils/types";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import TodoListService from "../../services/TodoListService";

export function UpdateList() {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<IStatus>({
        isError: false
    })

    const onTitleInputChange = (e: ChangeEvent) => setTitle(e.target.value)
    const onDescriptionInputChange = (e: ChangeEvent) => setDescription(e.target.value)

    async function submitHandler(event: FormEvent) {
        setStatus({ isError: false })
        event.preventDefault()

        if(!id) {
            setStatus({ isError: true, message: "нету id списка" })
            return
        }

        const numId = +id
        
        const result = await TodoListService.update({
            id: numId,
            title,
            description
        })
        if(!result) {
            setStatus({
                isError: true,
                message: "не получилось отредактировать список"
            })
            return
        }
        setStatus({
            isError: false,
            message: "получилось отредактировать список"
        })
    }
    
    return (
        <Form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Имя списка
                </label>
                <FormInput
                    id="title" 
                    type="text" 
                    placeholder="Имя списка"
                    name="title"
                    value={title}
                    onChange={onTitleInputChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Описание списка
                </label>
                <FormInput
                    id="description" 
                    type="text" 
                    placeholder="Описание списка"
                    name="description"
                    value={description}
                    onChange={onDescriptionInputChange}
                />
            </div>
            <div className="flex items-center justify-between">
                <Button text="Войти" type="submit"/>
            </div>
            {
                status.isError 
                ? <p className="text-red-500 text-xs italic">{ status.message }</p>
                : <p className="text-green-500 text-xs italic">{ status.message }</p>
            }
        </Form>
    )
}