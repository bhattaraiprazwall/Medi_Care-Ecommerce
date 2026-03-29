import ProductEdit from '@/components/admin/productEdit'
import React from 'react'


type Props = {
    params: Promise<{
        id: string
    }>
}

async function Page(props: Props) {

    const { id } = await props.params

    return (
        <div>
            <ProductEdit id={id} />
        </div>
    )
}

export default Page 