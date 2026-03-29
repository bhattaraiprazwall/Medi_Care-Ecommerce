'use client'

import { removefromwishlist } from "@/api/wishlist.api"
import { IProduct } from "@/interface/product.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

interface IProps {
    product: IProduct
    wishlistID: string,
    disable?:boolean
}

const WishlistCard: React.FC<IProps> = ({ product, wishlistID ,disable}) => {

    const queryClient = useQueryClient();

    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: removefromwishlist,
        mutationKey: ['delete-wishlist'],
        onSuccess: (response) => {

            toast.success(response?.message)
            queryClient.invalidateQueries(({ queryKey: ['get-all-wishlist-products'] }))

        },
        onError: (error) => {

            toast.error(error?.message)

        }
    })

    if (isPending) {
        toast.loading("Removing from wishlist")
    }

    function onclick() {

        router.push(`/home/product/${product?._id}`)
    }

    function onRemove() {

        console.log(wishlistID)
        mutate(wishlistID)
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl shadow-md bg-white w-full my-2">

            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                        alt={product?.name}
                        src={product?.files?.[0]?.url || '/fallback.jpg'}
                        fill
                        className="object-contain rounded-md cursor-pointer"
                        onClick={onclick}
                    />
                </div>
                <div className="flex-1 cursor-pointer" onClick={onclick}>
                    <h3 className="text-base font-semibold text-gray-800 truncate">{product?.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Price: <span className="font-medium text-gray-700">${product?.price}</span></p>
                </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <button
                    disabled={disable}
                    onClick={onRemove}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer transition-all"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default React.memo(WishlistCard)
