import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import TodoListService from "../../services/TodoListService";
import { ChangeEvent, IStatus } from "../../utils/types";
import validate from "../../utils/validate";

export function CreateList() {
    const [title, setTitle] = useState("")
    // description can be empty so there is no need in adding descriptionProblem
    const [description, setDescription] = useState("")
    
    const [titleProblem, setTitleProblem] = useState(false)
    const [status, setStatus] = useState<IStatus>({
        isError: false,
        message: ""
    })

    const onTitleInputChange = (e: ChangeEvent) => setTitle(e.target.value)
    const onDescriptionInputChange = (e: ChangeEvent) => setDescription(e.target.value)

    function isValid(): boolean {
        return validate([
            {
                value: title,
                problemState: setTitleProblem
            }
        ])
    }

    async function onSubmit(e: FormEvent) {
        setStatus({ isError: false })
        e.preventDefault()

        if(!isValid()) {
            return
        }
        const result = await TodoListService.create({ title, description })
        if(!result) {
            setStatus({
                isError: true,
                message: "Не получилось создать новый список"
            })
            return
        }
        setStatus({ isError: false, message: "Новый список успешно содан" })
    }

    return (
        <Form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
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
                { titleProblem
                    ? <p className="text-red-500 text-xs italic">Имя списка не должно быть пустым</p>
                    : <></>
                }
            </div>
            <div className="mb-6">
                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">
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