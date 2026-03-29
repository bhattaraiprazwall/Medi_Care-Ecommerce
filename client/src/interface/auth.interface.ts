export interface  ISignup {

    userName: string,
    email: string,
    password: string,
    phonenumber?: number

}
export type ILogin = Omit<ISignup, 'userName' | 'phonenumber'>