'use client'

import React from 'react'
import Card from '../common/cards/card'
import { useQuery } from '@tanstack/react-query'
import { getlatestproducts } from '@/api/product'
import { IProduct } from '@/interface/product.interface'
import Link from 'next/link'

function SecondPage() {


    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-latest-products'],
        queryFn: getlatestproducts,

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

    console.log("data", data)
    return (
        <div className=' font-sans px-9 pb-6 mt-29'>

            <div className='flex justify-between pt-9' >

                <div className=''>

                    <h1 className='text-6xl font-bold '>NEW ARRIVALS</h1>
                    <p className='text-3xl pt-6 '>
                        Shop now and fuel
                        <br />your body with the best!
                    </p>
                </div>
                <div className='font-medium'>
                    <div className='flex space-x-6 items-center'>
                        <p>Vitamins</p>
                        <p className='bg-blue-300 p-2 rounded-4xl'>Dietary supplements</p>

                    </div>
                    <div className='pt-14'>

                        <p>Whether you&apos;re looking to strengthen
                            <br />your immune system, enhance your<br /> energy levels, or promote overall <br />wellness, we&apos;ve got you covered.</p>
                        <br />
                        <Link href={'/home'}>View all products</Link>
                    </div>
                </div>
            </div>


            <div className='flex space-x-4 my-6'>
                {data?.data.slice(0, 5).map((product: IProduct, index: number) => (
                    <Card product={product} key={index} />
                ))}
            </div>


        </div>
    )
}

export default SecondPage