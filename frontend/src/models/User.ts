export interface IStoredCredentials {
    token: string
    username: string
}

export interface ILoginInput {
    username: string
    password: string
}

export interface IRegisterInput {
    name: string
    username: string
    password: string
}