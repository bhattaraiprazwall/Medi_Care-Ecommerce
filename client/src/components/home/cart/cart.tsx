'use client'

import { cartList } from "@/api/wishlist.api"
import CartCard from "@/components/common/cards/cart.card"
import { ICart } from "@/interface/wishlist.interface"
import { useQuery } from "@tanstack/react-query"


const Cart = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-cart-products'],
        queryFn: cartList,
    })

    console.log('data', data)


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading cart...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Failed to load cart.</div>
    }

    if (data?.data.length <= 0) {

        return (
            <div className="flex justify-center items-center h-screen text-red-400">
                Cart empty
            </div>
        )
    }

    return (

        <div className='  mt-6 font-sans'>

            <div>
                <h1 className=" text-2xl font-bold mx-46 mt-2">
                    My Cart
                </h1>
            </div>
            <div className="flex space-y-6 my-6 flex-col justify-center content-center  h-full m-46  rounded-lg ">

                {data?.data.slice(0, 5).map((cartItem: ICart, index: number) => (
                    <CartCard product={cartItem?.product} cartID={cartItem?._id} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Cart
