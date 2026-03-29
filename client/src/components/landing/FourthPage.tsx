'use client'

import React, { useState } from 'react'
import Card from '../common/cards/card'
import { useQuery } from '@tanstack/react-query'
import { products } from '@/api/product'
import { IProduct } from '@/interface/product.interface'

const chunkSize = 5

const chunkArray = (arr: IProduct[], size: number) => {
    const result = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}

function FourthPage() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-products'],
        queryFn: products,
    })

    const chunks = data?.data ? chunkArray(data.data, chunkSize) : []

    const [currentChunkIndex, setCurrentChunkIndex] = useState(0)

    const handleLeft = () => {
        setCurrentChunkIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleRight = () => {
        setCurrentChunkIndex((prev) => Math.min(prev + 1, chunks.length - 1))
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Failed to load </div>
    }

    if (data?.data.length <= 0) {

        return (
            <div className="flex justify-center items-center h-screen text-red-400">
                Empty
            </div>
        )
    }

    return (
        <main className="relative w-full pt-26">
            <div className="relative w-full">
                {/* Left Arrow */}
                <button
                    onClick={handleLeft}
                    disabled={currentChunkIndex === 0}
                    aria-label="Previous"
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-300 rounded-full p-3 shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition`}
                    style={{ zIndex: 10 }}
                >
                    &#8592;
                </button>

                {/* Cards container */}
                <div className="flex justify-center overflow-hidden px-14 pb-6 space-x-3">
                    {chunks.length > 0 &&
                        chunks[currentChunkIndex].map((product, index) => (
                            <Card product={product} key={index} />
                        ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleRight}
                    disabled={currentChunkIndex === chunks.length - 1 || chunks.length === 0}
                    aria-label="Next"
                    className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-300 rounded-full p-3 shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition`}
                    style={{ zIndex: 10 }}
                >
                    &#8594;
                </button>
            </div>
        </main>


    )
}

export default FourthPage
