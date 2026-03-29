'use client'

import { removefromcart } from "@/api/wishlist.api"
import { IProduct } from "@/interface/product.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import toast from "react-hot-toast"
import React from "react"
import { useRouter } from "next/navigation"

interface IProps {
    product: IProduct
    cartID: string
}

const CaartCard: React.FC<IProps> = ({ product, cartID }) => {

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: removefromcart,
        mutationKey: ['delete-cart'],
        onSuccess: (response) => {

            toast.success(response?.message)
            queryClient.invalidateQueries(({ queryKey: ['get-all-cart-products'] }))

        },
        onError: (error) => {

            toast.error(error?.message)

        }
    })

    if (isPending) {
        toast.loading('Removing...')
    }
    const router = useRouter()

    function onRemove() {

        console.log(cartID)
        mutate(cartID)  
    }

    function onclick() {

        router.push(`/home/product/${product?._id}`)

    }
    return (

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl shadow-md bg-white w-full my-2">
            {/* Image section */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                        alt={product?.name}
                        src={product?.files?.[0]?.url || '/fallback.jpg'}
                        fill
                        onClick={onclick}
                        className="object-contain rounded-md cursor-pointer"
                    />
                </div>
                <div className="flex-1 cursor-pointer" onClick={onclick}>

                    <h3 className="text-base font-semibold text-gray-800 truncate">{product?.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Price: <span className="font-medium text-gray-700">Rs {product?.price}</span></p>
                </div>
            </div>

            {/* Remove button */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <button
                    onClick={onRemove}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer transition-all"
                >
                    Remove
                </button>
            </div>
        </div>

    )
}

export default React.memo(CaartCard)
