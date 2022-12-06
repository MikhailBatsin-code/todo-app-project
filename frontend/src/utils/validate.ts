function checkIsValid(value: string, problemState: React.Dispatch<React.SetStateAction<boolean>>): boolean {
    if(value.trim().length === 0) {
      problemState(true)
      return false
    }
    problemState(false)
    return true
}

export interface IValidatable {
    value: string,
    problemState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function validate(values: IValidatable[]): boolean {
    let valid = true
    values.forEach(val => {
        if(!checkIsValid(val.value, val.problemState)) {
            valid = false
        }
    })
    return valid
}