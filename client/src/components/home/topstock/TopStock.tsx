'use client'

import React from 'react'
import Card from '../../common/cards/card'
import { useQuery } from '@tanstack/react-query'
import { getMostbuyproducts } from '@/api/product'
import { IProduct } from '@/interface/product.interface'

function TopStock() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-mostBuy-products'],
        queryFn: getMostbuyproducts,

    })

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
        <main className='mt-16 font-sans'>
            <h1 className='text-4xl font-bold font-sans tracking-wide text-black m-6 '>

                Our Top Selling Stock
            </h1>

            <div className='px-6 pt-16 content-center   '>

                <div className='flex space-x-6 my-6'>
                    {data?.data.slice(0, 5).map((product: IProduct, index: number) => (
                        <Card product={product} key={index} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default TopStock