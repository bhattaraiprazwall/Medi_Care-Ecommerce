'use client';

import { removeHistory } from "@/api/product";
import { IProduct } from "@/interface/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface IProps {
    product: IProduct;
    purchaseID: string;   
    disable?: boolean;
}

const HistoryCard: React.FC<IProps> = ({ product, purchaseID, disable }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: removeHistory,
        mutationKey: ['delete-purchase-history'], 
        onSuccess: (response) => {
            toast.dismiss();
            toast.success(response?.message || "Deleted successfully!");
            queryClient.invalidateQueries(({ queryKey: ['get-all-purchase-products'] }))

        },
        onError: (error: any) => {
            toast.dismiss();
            toast.error(error?.message || "Failed to delete");
        }
    });

    const handleRemove = () => {
        toast.loading("Deleting purchase history...");
        mutate(purchaseID);
    };

    const handleViewDetails = () => {
        router.push(`/home/purchase`);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl shadow-md bg-white w-full my-2 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                        alt={product?.name}
                        src={product?.files?.[0]?.url || '/fallback.jpg'}
                        fill
                        className="object-contain rounded-md cursor-pointer"
                        onClick={handleViewDetails}
                    />
                </div>
                <div
                    className="flex-1 cursor-pointer"
                    onClick={handleViewDetails}
                >
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                        {product?.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Price: <span className="font-medium text-gray-700">${product?.price}</span>
                    </p>
                </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <button
                    disabled={disable || isPending}
                    onClick={handleRemove}
                    className={`bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition-all ${(disable || isPending) && 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    {isPending ? "Removing..." : "Remove"}
                </button>
            </div>
        </div>
    );
};

export default React.memo(HistoryCard);
