'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById, purchaseProduct, updateBuyCount } from '@/api/product';
import Input from '@/components/common/input/input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export type FormValues = {
    quantity: number;
    address: string;
    city?: string;
    zipCode?: string;
    country?: string;
};


interface IProps {
    id: string;
}

const CheckoutPage = ({ id }: IProps) => {
    console.log('id', id);

    const { data: product, isLoading } = useQuery({
        queryKey: ['get-product-by-id', id],
        queryFn: () => getProductById(id),
    });

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            quantity: 1,
            address: '',
            city: '',
            zipCode: '',
            country: '',
        },
    });

    const quantity = watch('quantity') || 1;

    const [calculatedTotal, setCalculatedTotal] = useState(0);

    useEffect(() => {
        if (product?.data?.price) {
            setCalculatedTotal(quantity * product.data.price);
        }
    }, [quantity, product]);

    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: purchaseProduct,
        mutationKey: ['purchase-product'],
        onSuccess: (data) => {
            toast.success(data?.data?.message ?? "Purchase confirmed")
            buyCount()
            router.back()
        },
        onError: (error) => {

            toast.error(error?.message ?? 'Enter address')
        },
    });

    const queryClient = useQueryClient()
    const { mutate: buyCount } = useMutation({
        mutationFn: () => updateBuyCount(id, {
            buyInfo: product?.data?.buyInfo + 1
        }),
        mutationKey: ['purchase-product'],
        onSuccess: (data) => {
            queryClient.invalidateQueries(({ queryKey: ['get-all-mostBuy-products'] }))
        },
    });

    const onSubmit = (data: FormValues) => {
        if (!product) {
            alert('Product not loaded');
            return;
        }

        const total = data.quantity * product.data.price;
        console.log('Order Details:', { ...data, total });

        mutate({
            id,
            data: { ...data },
        });
    };

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center w-screen">
                Loading...
            </div>
        );
    }
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">Shipping & Quantity</h2>

                <Input
                    required
                    label="Quantity"
                    name="quantity"
                    register={register}
                    error={errors?.quantity?.message}
                    type="number"
                />

                <Input
                    required
                    label="Address"
                    name="address"
                    register={register}
                    error={errors?.address?.message}
                    type="text"
                />

                <Input
                    required={false}
                    label="City"
                    name="city"
                    register={register}
                    error={errors?.city?.message}
                    type="text"
                />

                <Input
                    required={false}
                    label="ZIP Code"
                    name="zipCode"
                    register={register}
                    error={errors?.zipCode?.message}
                    type="text"
                />

                <Input
                    required={false}
                    label="Country"
                    name="country"
                    register={register}
                    error={errors?.country?.message}
                    type="text"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
                >
                    Place Order
                </button>
            </form>

            <div className="border border-gray-200 p-4 rounded-lg shadow h-full w-full flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex items-center gap-4">
                    <Image
                        src={product?.data.files?.[0].url || '/placeholder.png'}
                        alt={product?.data.name || 'Product'}
                        width={80}
                        height={80}
                        className="rounded"
                    />
                    <div>
                        <h3 className="font-medium">{product?.data.name || 'Product'}</h3>
                        <p className="text-sm text-gray-600">Qty: {quantity}</p>
                        <p className="text-sm font-semibold">
                            ${product?.data.price} each
                        </p>
                    </div>
                </div>

                <div className="flex justify-between mt-4 font-semibold">
                    <span>Total</span>
                    <span>${calculatedTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
