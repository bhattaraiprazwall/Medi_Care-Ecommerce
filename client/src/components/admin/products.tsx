'use client'

import { delproduct, products } from '@/api/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ActionButtons from '../common/buttons/actionButton'
import { createColumnHelper } from '@tanstack/react-table'
import { formatDate } from '@/util/formatdate'
import Table from '../common/table/table'
import Button from '../common/buttons/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'

function Products() {

    const { data, isLoading, error } = useQuery({

        queryKey: ['get-all-products'],
        queryFn: products,

    })

    const queryCLient = useQueryClient()

    const { isPending, mutate } = useMutation({

        mutationFn: delproduct,
        mutationKey: ['delete-product'],
        onSuccess: (response) => {

            toast.success(response?.message)
            queryCLient.invalidateQueries({ queryKey: ['get-all-products'] })
            queryCLient.invalidateQueries({ queryKey: ['get-all-wishlist-products'] })
            queryCLient.invalidateQueries({ queryKey: ['get-all-cart-products'] })
            queryCLient.invalidateQueries({ queryKey: ['get-all-purchase-products'] })

        },
        onError: (error: any) => {
            toast.error(error?.message)
        }
    })

    if (isPending) {

        toast.loading('Deleting Product')
    }

    const router = useRouter()
    const columnHelper = createColumnHelper<any>()

    function onDelete(id: string) {

        console.log("id", id)
        mutate(id)
    }
    function onEdit(id: string) {

        router.replace(`/admin/product/edit/${id}`)
    }

    function add() {

        router.push('product/add')
    }

    const columns = [

        columnHelper.accessor('name', {
            id: 'name',
            cell: info => <span className='line-clamp-3'>{info.getValue()}</span>,
            header: () => <span >Product Name</span>,
        }),
        columnHelper.accessor('price', {
            id: 'price',
            cell: info => <i>{info.getValue() ?? '-'}</i>,
            header: () => "Price"
        }),
        columnHelper.accessor('description', {
            id: 'description',
            header: () => 'Description',
            cell: info => <i className='line-clamp-3'>{info.getValue() ?? '-'}</i>,
        }),
        columnHelper.accessor('createdAt', {
            id: 'createdAt',
            cell: info => formatDate(info.renderValue()),
            header: () => <span>Created at</span>,
        }),
        columnHelper.accessor('updatedAt', {
            id: 'updatedAt',
            cell: info => formatDate(info.renderValue()),
            header: () => "Updated At"
        }),
        columnHelper.accessor('flavour', {
            id: 'flavour',
            cell: info => info.renderValue(),
            header: () => <span>Flavour</span>,
        }),
        columnHelper.accessor('files', {
            id: 'files',
            header: () => "Product Image",
            cell: info => {
                const files = info.getValue();
                const imageUrl = files?.[0]?.url || files?.[0]?.public_id;

                return imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="Product"
                        width={23}
                        height={23}
                        className="w-16 h-16 object-cover rounded"
                    />
                ) : (
                    <span>No Image</span>
                );
            },
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: 'Action',
            cell: (info) => <ActionButtons onEdit={() => onEdit(info.row.original._id)} onDelete={() => onDelete(info.row.original._id)} />
        }),
    ]

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading ...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Failed to load </div>
    }

    if (data?.data.length <= 0) {

        return (
            <div className="flex justify-center items-center h-screen  space-x-7">
                <label className='text-red-400'>

                    No products found
                </label>
                <Link href={'/admin/product/add'} className='border p-2 bg-black text-white rounded-lg'>add product</Link>
            </div>
        )
    }

    return (
        <main className='h-full'>
            <div className='flex justify-between  px-5 pb-2 py-4 '>

                <h1 className=' font-semibold text-2xl'>Products</h1>
                <Button text='Add Product' onClick={add} />
            </div>
            <main className='mx-4 border-2 border-gray-200 rounded-lg flex-1 font-sans grow overflow-hidden '>

                <div className='flex-1 flex flex-col '>

                    <Table data={data?.data ?? []} columns={columns} />
                </div>
            </main>
        </main>
    )
}

export default Products 