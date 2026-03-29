import CheckoutPage from '@/components/home/product/chekcout'
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


        <main className="w-full h-full">
            <CheckoutPage id={id} />
        </main>
    )
}

export default Page