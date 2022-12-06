import React, { FormEventHandler } from 'react'

interface FormProps {
    children: React.ReactNode
    onSubmit: FormEventHandler<HTMLFormElement>
}

export default function Form({children, onSubmit}: FormProps) {
  return (
    <div className="w-2xl max-w-3xl">
      <form 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
        onSubmit={onSubmit}>
            {children}
        </form>
    </div>
  )
}
