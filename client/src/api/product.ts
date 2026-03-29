import { IProduct } from "@/interface/product.interface"
import apiInstance from "."
import { FormValues } from "@/components/home/product/chekcout"

export const addProduct = async (data: IProduct) => {

    try {

        const reponse = await apiInstance.post('/product', data)
        return reponse?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}

export const products = async () => {

    try {

        const response = await apiInstance.get('/product')
        return response?.data

    } catch (error: any) {

        throw error?.response?.data

    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await apiInstance.get(`/product/${id}`)
        return response.data
    } catch (error: any) {
        throw new error.response.data
    }
}



export const getlatestproducts = async () => {

    try {

        const response = await apiInstance.get('/product/latest')
        return response?.data

    } catch (error: any) {

        throw error?.response?.data

    }
}
export const getMostbuyproducts = async () => {

    try {

        const response = await apiInstance.get('/product/mostBuyed')
        return response?.data

    } catch (error: any) {

        throw error?.response?.data

    }
}
export const getMostlikedproducts = async () => {

    try {

        const response = await apiInstance.get('/product/mostBuyed')
        return response?.data

    } catch (error: any) {

        throw error?.response?.data

    }
}

export const delproduct = async (id: string) => {

    try {

        const response = await apiInstance.delete(`/product/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data

    }
}

export const editProduct = async (id: string, data: FormData | Partial<IProduct>) => {
    try {
        const response = await apiInstance.patch(`/product/${id}`, data, {
            headers: data instanceof FormData ? {
                'Content-Type': 'multipart/form-data',
            } : undefined
        });
        return response?.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const updateBuyCount = async (id: string, data: Partial<IProduct>) => {
    try {
        const response = await apiInstance.patch(`/product/${id}`, data,)
        return response?.data;
    } catch (error: any) {
        throw error?.response?.data;
    }
}

export const purchaseProduct = async ({ id, data }: { id: string, data: FormValues }) => {

    try {

        const response = await apiInstance.post(`/purchase/${id}`, data);

        return response?.data;

    } catch (error: any) {

        throw error?.reponse?.data
    }
};


export const purchaseHistory = async () => {

    try {

        const reponse = await apiInstance.get('/purchase/history')

        return reponse?.data;
    } catch (error: any) {

        throw error?.reponse?.data
    }
}



export const removeHistory = async (id: string) => {

    try {

        const response = await apiInstance.delete(`/purchase/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}