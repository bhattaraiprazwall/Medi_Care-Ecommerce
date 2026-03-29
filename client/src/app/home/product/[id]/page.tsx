import Product from '@/components/home/product/product'
import React from 'react'


type Props = {
    params: Promise<{
        id: string
    }>
}

const Page = async (props: Props) => {

    const { id } = await props.params   

    console.log("product id", id)
    return (

        <main className='w-full h-full'>

            <Product id={id} />


        </main>
    )
}

export default Page