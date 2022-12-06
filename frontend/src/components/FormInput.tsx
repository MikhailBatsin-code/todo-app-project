import React, { ChangeEventHandler } from 'react'

interface FormInputProps {
  placeholder?: string
  className?: string
  name?: string
  id?: string
  type?: string
  value?: any
  onChange?: ChangeEventHandler
}

export default function FormInput({placeholder, className, name, id, type, value, onChange}: FormInputProps) {
  return (
    <input 
      placeholder={placeholder} 
      name={name} 
      id={id} 
      type={type}
      onChange={onChange}
      value={value}
      className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" + className}/>
  )
}
