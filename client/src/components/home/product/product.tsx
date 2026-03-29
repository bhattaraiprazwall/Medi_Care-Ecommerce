'use client'

import { getProductById } from '@/api/product'
import ProductCard from '@/components/common/cards/product.card'
import { useQuery } from '@tanstack/react-query'
import React from 'react'


interface Iprops {

    id: string
}


const Product = (props: Iprops) => {

    const { id } = props
    // console.log(id)

    const { data, isLoading } = useQuery({
        queryFn: () => getProductById(id),
        queryKey: ['product']
    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading</div>
    }

    return (
        <div className="flex justify-center items-center min-h-screen overflow-hidden  p-4">
            <ProductCard product={data?.data} />
        </div>
    )

}

export default Product