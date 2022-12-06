import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import AuthService from "../../services/AuthService";
import { ChangeEvent } from "../../utils/types";
import validateEverything, { IValidatable } from "../../utils/validate"

interface IStatus {
  isError: boolean
  message: string
}

export default function SignUp() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nameProblem, setNameProblem] = useState(false)
  const [usernameProblem, setUsernameProblem] = useState(false)
  const [passwordProblem, setPasswordProblem] = useState(false)
  const [passwordConfirmationProblem, setPasswordConfirmationProblem] = useState("")
  const [status, setStatus] = useState<IStatus>({
    isError: false,
    message: ""
  })

  function onUsernameInputChange(event: ChangeEvent) {
    setUsername(event.target.value)
  }

  function onNameInputChange(event: ChangeEvent) {
    setName(event.target.value)
  }

  function onPasswordInputChange(event: ChangeEvent) {
    setPassword(event.target.value)
  }

  function onPasswordConfirmInputChange(event: ChangeEvent) {
    setPasswordConfirm(event.target.value)
  }

  function validate() {
    const toValidate: IValidatable[] = [
      { value: name, problemState: setNameProblem },
      { value: username, problemState: setUsernameProblem },
      { value: password, problemState: setPasswordProblem }
    ]

    if(password === passwordConfirm) {
      setPasswordConfirmationProblem("")
      return validateEverything(toValidate)
    }

    setPasswordConfirmationProblem("пароли должны совпадать")
    return false
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault()
    if(!validate()) {
      return
    }
    const result = await AuthService.register({name, username, password})
    if(!(typeof result == typeof true)) {
      setStatus({
        isError: true,
        message: "аккаунт не может быть создан"
      })
      return
    }
    setStatus({ isError: false, message: "аккаунт успешно создан" })
  }

  return (
    <Form onSubmit={submitHandler}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Ваше имя
        </label>
        <FormInput
          id="name" 
          type="text" 
          placeholder="Имя"
          name="name"
          value={name}
          onChange={onNameInputChange}
        />
        { nameProblem
            ? <p className="text-red-500 text-xs italic">Имя не должно быть пустым</p>
            : <></>
        }
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Имя пользователя
        </label>
        <FormInput
          id="username" 
          type="text" 
          placeholder="Имя пользователя"
          name="username"
          value={username}
          onChange={onUsernameInputChange}
        />
        { usernameProblem
            ? <p className="text-red-500 text-xs italic">Имя пользователя не должно быть пустым</p>
            : <></>
        }
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Пароль
        </label>
        <FormInput
          id="password" 
          type="password" 
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={onPasswordInputChange}
        />
        { passwordProblem
            ? <p className="text-red-500 text-xs italic">Пароль не должен быть пустым</p>
            : <></>
        }
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Подтверждение пароля
        </label>
        <FormInput
          id="password-confirm" 
          type="password" 
          placeholder="Пароль"
          name="password-confirm"
          value={passwordConfirm}
          onChange={onPasswordConfirmInputChange}
        />
        { passwordConfirmationProblem
            ? <p className="text-red-500 text-xs italic">{ passwordConfirmationProblem }</p>
            : <></>
        }
      </div>
      <div className="flex items-center justify-between">
        <Button text="Войти" type="submit"/>
      </div>
      {
        status.isError
          ? <p className="text-red-500 text-xs italic">{ status.message }</p>
          : <p className="text-green-500 text-xs italic">{ status.message }</p>
      }
      <Link 
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
        to="/auth/sign-in"
      >Есть аккаунт</Link>
    </Form>
  )
}
