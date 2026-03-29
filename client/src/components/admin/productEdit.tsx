'use client'

import React, { useEffect, useState } from 'react'
import Input from '../common/input/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductSchema } from '@/schema/admin.product.schema'
import ImageUploaderController from '../common/input/file-upload'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editProduct, getProductById } from '@/api/product'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '../common/buttons/button'

interface IProps {
    id: string
}

const ProductEdit = ({ id }: IProps) => {
    const [existingImages, setExistingImages] = useState<any[]>([])
    const [deletedFiles, setDeletedFiles] = useState<string[]>([])

    const { data, isLoading } = useQuery({
        queryFn: () => getProductById(id),
        queryKey: ['product', id],
    })

    const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
        defaultValues: {
            name: '',
            price: '',
            description: '',
            flavour: '',
            product: undefined
        },
        resolver: yupResolver(ProductSchema),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (formData: FormData) => editProduct(id, formData),
        mutationKey: ['edit-product'],
        onSuccess: (response) => {
            toast.success(response?.message)
            router.replace('/admin/product')
            queryClient.invalidateQueries({ queryKey: ['get-all-products',] })
            queryClient.invalidateQueries({ queryKey: ['product', id] })
            reset()
        },
        onError: (error: any) => {
            console.log("error", error)
            toast.error(error?.message || "Something went wrong")
        }
    })

    useEffect(() => {
        if (data?.data) {
            const { name, price, description, flavour, files } = data.data
            reset({ name, price, description, flavour, product: undefined })
            setExistingImages(files || files?.public_id)
        }
    }, [data, reset])

    const handleDeleteImage = (filename: string) => {
        setExistingImages((prev) => prev.filter(img => img.filename !== filename))
        setDeletedFiles((prev) => [...prev, filename])
    }

    function onsubmit(formDataValues: any) {
        const formData = new FormData()

        formData.append('name', formDataValues.name)
        formData.append('price', String(formDataValues.price))
        formData.append('description', formDataValues.description)
        formData.append('flavour', formDataValues.flavour)

        if (formDataValues.product instanceof File) {
            formData.append('product', formDataValues.product)
        } else if (Array.isArray(formDataValues.product)) {
            formDataValues.product.forEach((file: File) => {
                formData.append('product', file)
            })
        }

        if (deletedFiles.length > 0) {
            formData.append('deletedFiles', JSON.stringify(deletedFiles))
        }

        mutate(formData)
    }

    function backtolist() {

        router.push('/admin/product')
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading</div>
    }

    if (isError) {
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
        <div className='min-h-screen font-sans flex flex-col justify-center items-center'>
            <div className='flex justify-between w-full px-5 pb-2 py-4 '>

                <h1 className=' font-semibold text-2xl'>Edit Product</h1>
                <Button text='Back to list    <  ' onClick={backtolist} />
            </div>
            <div className='border p-7 rounded-lg w-full max-w-xl'>

                <form className='space-y-4' onSubmit={handleSubmit(onsubmit)}>
                    <Input
                        label='Product Name'
                        placeholder='Enter Product Name'
                        name='name'
                        required={false}
                        register={register}
                        error={errors?.name?.message}
                    />

                    <Input
                        label='Product Price'
                        placeholder='Enter Product Price'
                        name='price'
                        required={false}
                        type='number'
                        register={register}
                        error={errors?.price?.message}
                    />

                    <Input
                        label='Product Flavour'
                        placeholder='Enter Product Flavour'
                        required={false}
                        name='flavour'
                        register={register}
                        error={errors?.flavour?.message}
                    />

                    <Input
                        label='Product Description'
                        placeholder='Enter Product Description'
                        required={false}
                        name='description'
                        register={register}
                        error={errors?.description?.message}
                    />

                    <div className="space-y-2">
                        <label className='text-sm font-medium'>Existing Images</label>
                        <div className='flex flex-wrap gap-4 py-6'>
                            {existingImages.map((file) => (
                                <div key={file._id} className='relative group'>
                                    <Image
                                        src={file.url}
                                        alt={file.originalname}
                                        width={100}
                                        height={100}
                                        className='rounded-md border'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => handleDeleteImage(file.filename)}
                                        className='absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full px-1 hover:bg-red-700'
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ImageUploaderController control={control} name="product" multiple={false} />



                    <button
                        type='submit'
                        disabled={isPending}
                        className='w-full text-white bg-black rounded-lg p-2 hover:bg-gray-900 transition cursor-pointer'
                    >
                        {isPending ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
