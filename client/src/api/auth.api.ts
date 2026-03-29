import { ILogin } from "@/interface/auth.interface";
import apiInstance from "."

export const login = async (data: ILogin) => {

    console.log("api data", data)
    try {

        const response = await apiInstance.post('/user/login', data);
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }

}

export const signup = async (data: ILogin) => {

    console.log("api data", data)
    try {

        const response = await apiInstance.post('/user/signup', data);
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }

}