import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { ChangeEvent, IStatus } from "../../utils/types";
import TodoItemService from "../../services/TodoItemService";
import { Result } from "../../utils/result";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import Form from "../../components/Form";

export function UpdateItem() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [done, setDone] = useState(false)
    const [status, setStatus] = useState<IStatus>({
        isError: false
    })

    const onTitleInputChange       = (e: ChangeEvent) => setTitle(e.target.value)
    const onDescriptionInputChange = (e: ChangeEvent) => setDescription(e.target.value)
    const onDoneButtonClick        = (e: ChangeEvent) => setDone(!done)

    async function submitHandler(event: FormEvent) {
        setStatus({ isError: false })
        event.preventDefault()

        if(!id) {
            setStatus({ isError: true, message: "нету id предмета списка" })
            return
        }

        const numId = +id

        const result = await TodoItemService.update({
            id: numId,
            title,
            description,
            done
        })
        if(result === Result.BAD) {
            setStatus({
                isError: true,
                message: "не получилось отредактировать предмет списка"
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
                    Имя предмета списка
                </label>
                <FormInput
                    id="title" 
                    type="text" 
                    placeholder="Имя предмета списка"
                    name="title"
                    value={title}
                    onChange={onTitleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Описание предмета списка
                </label>
                <FormInput
                    id="description" 
                    type="text" 
                    placeholder="Описание предмета списка"
                    name="description"
                    value={description}
                    onChange={onDescriptionInputChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Статус предмета списка
                </label>
                <input
                    id="status" 
                    type="checkbox" 
                    name="status"
                    checked={done}
                    onChange={onDoneButtonClick}
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