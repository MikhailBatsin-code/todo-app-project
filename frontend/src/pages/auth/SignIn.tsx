import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
import AuthService from "../../services/AuthService";
import { ChangeEvent, IStatus } from "../../utils/types";
import validateEverything, { IValidatable } from "../../utils/validate";

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameProblem, setUsernameProblem] = useState(false)
  const [passwordProblem, setPasswordProblem] = useState(false)
  const [status, setStatus] = useState<IStatus>({
    isError: false,
    message: ""
  })

  const onUsernameInputChange = (e: ChangeEvent) => setUsername(e.currentTarget.value)
  const onPasswordInputChange = (e: ChangeEvent) => setPassword(e.currentTarget.value)

  function validate() {
    const toValidate: IValidatable[] = [ 
      { value: username, problemState: setUsernameProblem }, 
      { value: password, problemState: setPasswordProblem } 
    ]
    return validateEverything(toValidate)
  }

  async function submitHandler(event: FormEvent) {
    setStatus({ isError: false })
    event.preventDefault()
    
    if(!validate()) {
      return
    }
    const result = await AuthService.login({username, password})
    if(!result) {
      setStatus({
        isError: true,
        message: "аккаунт не найден"
      })
      return
    }
    window.location.reload()
  }

  return (
    <Form onSubmit={submitHandler}>
      <div className="mb-4">
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
      </div>
      <div className="flex items-center justify-between">
        <Button text="Войти" type="submit"/>
      </div>
      {
        status.isError 
          ? <p className="text-red-500 text-xs italic">{ status.message }</p>
          : <></>
      }
      <Link 
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
        to="/auth/sign-up"
      >Нету аккаунта</Link>
    </Form>
  )
}
