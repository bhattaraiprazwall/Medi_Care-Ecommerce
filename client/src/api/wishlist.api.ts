import apiInstance from "."

export const wishList = async () => {

    try {


        const response = await apiInstance.get('/wishlist')

        return response?.data
    } catch (error: any) {

        throw error?.response?.data
    }
}

export const cartList = async () => {

    try {


        const response = await apiInstance.get('/cart')

        return response?.data
    } catch (error: any) {

        throw error?.response?.data
    }
}

export const addtocart = async (id: string) => {

    try {

        const response = await apiInstance.patch(`/cart/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}

export const addtowishlist = async (id: string) => {

    try {

        const response = await apiInstance.patch(`/wishlist/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}
export const removefromwishlist = async (id: string) => {

    try {

        const response = await apiInstance.delete(`/wishlist/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}

export const removefromcart = async (id: string) => {

    try {

        const response = await apiInstance.delete(`/cart/${id}`)
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }
}