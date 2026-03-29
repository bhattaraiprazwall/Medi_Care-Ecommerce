'use client'

import React, { useState } from 'react'
import Card from '../../common/cards/card'
import { useQuery } from '@tanstack/react-query'
import { products } from '@/api/product'
import { IProduct } from '@/interface/product.interface'

function ProductGrid() {
    const initialVisibleCount = 15 // 5 cols x 3 rows
    const loadMoreIncrement = 5

    const [visibleCount, setVisibleCount] = useState(initialVisibleCount)

    const { isLoading, error, data } = useQuery({
        queryKey: ['get-products'],
        queryFn: products,
    })

    const handleShowMore = () => {
        setVisibleCount(prev => prev + loadMoreIncrement)
    }

    const handleShowLess = () => {
        setVisibleCount(initialVisibleCount)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (isLoading) return <div className="text-center mt-20 text-gray-600 text-lg">Loading...</div>
    if (error) return <div className="text-center mt-20 text-red-500">Error loading products</div>

    return (
        <main className="mt-20 mb-20">
            <div className="w-full">
                <h1 className="text-4xl font-bold text-start text-gray-800 mb-12 pl-6">
                    Our Products
                </h1>   

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 space-x-4 space-y-6 px-4 sm:px-6 md:px-8 lg:px-10">
                    {data?.data.slice(0, visibleCount).map((product: IProduct, index: number) => (
                        <div key={index} className="flex">
                            <Card product={product} />
                        </div>
                    ))}
                </div>


                <div className="text-center mt-12 space-x-4">
                    {data?.data && visibleCount < data.data.length && (
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black-700 transition-colors shadow-md mb-6"
                        >
                            Show More ({data.data.length - visibleCount} remaining)
                        </button>
                    )}
                    {visibleCount > initialVisibleCount && (
                        <button
                            onClick={handleShowLess}
                            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors shadow-md mb-7"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProductGrid
