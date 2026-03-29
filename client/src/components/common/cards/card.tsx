'use client'

import Image from 'next/image'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { IProduct } from '@/interface/product.interface'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addtocart, addtowishlist } from '@/api/wishlist.api'
import toast from 'react-hot-toast'

interface IProps {
    product: IProduct
}

const Card: React.FC<IProps> = ({ product }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: addtocart,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            toast.success(response?.message || "Added to cart")
        },
        onError: (error: any) => {
            toast.error(error?.message || "Something went wrong")
        }
    })

    const { mutate: addToWishlist, isPending: wishlistPending } = useMutation({
        mutationFn: addtowishlist,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
            toast.success(response?.message || "Added to wishlist")
        },
        onError: (error: any) => {
            toast.error(error?.message || "Something went wrong")
        }
    })

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()
        mutate(product._id)
    }

    const handleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToWishlist(product._id)
    }

    const handleProductClick = () => {
        router.push(`/home/product/${product._id}`)
    }

    if (!product) return null

    return (
        <motion.div
            className='bg-white w-[300px] h-[440px] rounded-2xl p-4 flex flex-col shadow-md hover:shadow-xl transition-shadow'
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Image Section */}
            <div className='relative h-48 w-full cursor-pointer' onClick={handleProductClick}>
                <Image
                    src={product?.files?.[0]?.url || '/fallback.jpg'}
                    alt={product.name}
                    sizes='34'
                    fill
                    className='object-contain rounded-xl bg-white'
                />
            </div>

            {/* Product Info */}
            <div className='flex-1 mt-4' onClick={handleProductClick}>
                <h2 className='text-lg font-semibold line-clamp-1'>{product.name}</h2>
                <p className='text-sm text-gray-600 line-clamp-1'>{product.flavour}</p>
                <p className='text-md font-medium mt-2'>Rs {product.price}</p>
            </div>

            {/* Action Buttons */}
            <div className='mt-4 flex items-center justify-between space-x-2'>
                <motion.button
                    type="button"
                    onClick={handleWishlist}
                    disabled={wishlistPending}
                    whileHover={{ scale: 1.1 }}
                    className='flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50'
                >
                    <FaRegHeart className='text-red-500' />
                    Wishlist
                </motion.button>

                <motion.button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isPending}
                    whileHover={{ scale: 1.1 }}
                    className='flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50'
                >
                    <IoMdCart size={16} />
                    Add to Cart
                </motion.button>
            </div>

            {/* Buy Now Button */}
            <motion.button
                className='mt-3 w-full py-2 rounded-full bg-black text-white text-sm hover:bg-gray-900 transition'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/home/product/purchase/${product._id}`)
                }}
            >
                Buy Now
            </motion.button>
        </motion.div>
    )
}

export default React.memo(Card)
