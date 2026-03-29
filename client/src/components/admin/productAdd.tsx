'use client'

import React from 'react'
import Input from '../common/input/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductSchema } from '@/schema/admin.product.schema'
import ImageUploaderController from '../common/input/file-upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { addProduct } from '@/api/product'
import { useRouter } from 'next/navigation'
import Button from '../common/buttons/button'

function ProductAdd() {

    const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
        defaultValues: {
            name: '',
            price: '',
            description: '',
            flavour: '',
            product: undefined
        },
        // resolver: yupResolver(ProductSchema),
        mode: 'all',

    })

    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutate, isPending, isError } = useMutation({

        mutationFn: addProduct,
        mutationKey: ['add-product'],
        onSuccess: (response) => {

            toast.success(response?.message)
            router.replace('/admin/product')
            queryClient.invalidateQueries({ queryKey: ['get-all-products'] })
            queryClient.invalidateQueries({ queryKey: ['get-all-mostBuy-products'] })
            reset()

        },

        onError: (error) => {
            console.log("error", error)
            toast.error(error?.message)
        }
    })

    if (isError) {
        toast.error("Error while adding")
    }
    function onsubmit(data: any) {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('price', String(data.price));
        formData.append('description', data.description);
        formData.append('flavour', data.flavour);

        if (data.product instanceof File) {
            formData.append('product', data.product);
        } else if (Array.isArray(data.product)) {
            data.product.forEach((file: File) => {
                formData.append('product', file);
            });
        }

        mutate(formData as any);

    }

    function backtolist() {

        router.push('/admin/product')
    }

    return (
        <div className='font-sans flex flex-col justify-center items-center'>

            <div className='flex justify-between w-full px-5 pb-2 py-4 '>

                <h1 className=' font-semibold text-2xl'>Add Product</h1>
                <Button text='<  Back to list  ' onClick={backtolist} />
            </div>

            <div className='  border  p-7 rounded-lg '>
                <form className=' space-y-3 items-center flex flex-col w-full  ' onSubmit={handleSubmit(onsubmit)}>

                    <Input
                        label='Product name'
                        required={true}
                        placeholder='Enter Product Name'
                        name='name'
                        register={register}
                        error={errors?.name?.message}
                    />

                    <Input
                        label='Product Price'
                        required={true}
                        placeholder='Enter Product Price'
                        name='price'
                        register={register}
                        type='number'
                        error={errors?.price?.message}
                    />


                    <Input
                        label='Product Flavour'
                        required={true}
                        placeholder='Enter Product Flavour'
                        name='flavour'
                        register={register}
                        error={errors?.flavour?.message}
                    />


                    <Input
                        label='Product Description'
                        required={true}
                        placeholder='Enter Product Description'
                        name='description'
                        register={register}
                        multiline={true}
                        error={errors?.description?.message}
                    />

                    <ImageUploaderController control={control} name="product" multiple={false} />

                    <button disabled={isPending} className='text-white bg-black rounded-lg p-2 cursor-pointer'>
                        {
                            isPending ? "Adding..." : "Add product"
                        }

                    </button>

                </form>
            </div>
        </div>
    )
}

export default ProductAdd