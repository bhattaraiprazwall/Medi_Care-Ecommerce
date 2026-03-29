import { IProduct } from "@/interface/product.interface";
import Image from "next/image";
import Button from "../buttons/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtocart } from "@/api/wishlist.api";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";

interface IProps {
    product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: addtocart,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['get-all-cart-products'] });
            toast.success(response?.message || "Added to cart");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Something went wrong");  
        },
    });

    function handleAddToCart() {
        mutate(product._id);
    }

    function onBuy() {
        router.push(`/home/product/purchase/${product?._id}`);
    }

    return (
        <div className="flex flex-col md:flex-row rounded-2xl shadow-md overflow-hidden w-full max-w-4xl mx-auto p-6 gap-6 bg-white">
            {/* Image Section */}
            <div className="relative w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    alt={product?.name || ""}
                    src={product?.files?.[0]?.url || "/fallback.jpg"}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Info & Actions */}
            <div className="flex flex-col flex-1 justify-between">
                {/* Product Info */}
                <div className="space-y-2 mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {product?.name}
                    </h2>
                    <p className="text-xl text-green-600 font-bold">${product?.price}</p>
                    <p className="text-gray-600 line-clamp-4">{product?.description}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <Button text="Buy Now" onClick={onBuy} />
                    <Button text="Add to Cart" onClick={handleAddToCart} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
