import { FormEvent, useState } from "react";
import Form from "../../components/Form";
import { ChangeEvent, IStatus } from "../../utils/types";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import validate from "../../utils/validate";
import { useParams } from "react-router-dom";
import TodoItemService from "../../services/TodoItemService";
import { Result } from "../../utils/result";

export function CreateItem() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [titleProblem, setTitleProblem] = useState(false)
    const [status, setStatus] = useState<IStatus>({
        isError: false,
        message: ""
    })

    function isValid(): boolean {
        return validate([
            {
                value: title,
                problemState: setTitleProblem
            }
        ])
    }

    async function onSubmit(e: FormEvent) {
        if(!id) {
            return
        }

        setStatus({ isError: false })
        e.preventDefault()

        if(!isValid()) {
            return
        }
        const result = await TodoItemService.create({ title, description, done: false }, id)
        if(result === Result.BAD) {
            setStatus({
                isError: true,
                message: "не получилось создать предмет списка"
            })
            return
        }
        setStatus({ isError: false, message: "Новый список успешно содан" })
    }

    const onTitleInputChange = (e: ChangeEvent) => setTitle(e.target.value)
    const onDescriptionInputChange = (e: ChangeEvent) => setDescription(e.target.value)

    return (
        <Form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
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
                { titleProblem
                    ? <p className="text-red-500 text-xs italic">Имя предмета списка не должно быть пустым</p>
                    : <></>
                }
            </div>
            <div className="mb-6">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">
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
            <div className="flex items-center justify-between">
                <Button text="Создать" type="submit" />
            </div>
            {
                status.isError 
                    ? <p className="text-red-500 text-xs italic">{ status.message }</p>
                    : <p className="text-green-500 text-xs italic">{ status.message }</p>
            }
        </Form>
    )
}