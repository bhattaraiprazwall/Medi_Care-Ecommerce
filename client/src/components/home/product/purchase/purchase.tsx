'use client'

import { purchaseHistory } from "@/api/product"
import HistoryCard from "@/components/common/cards/history.card"
import { IWishlist } from "@/interface/wishlist.interface"
import { useQuery } from "@tanstack/react-query"


const Purchase = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-purchase-products'],
        queryFn: purchaseHistory,

    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading purchase history...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Failed to load purchase history.</div>
    }

    if (data?.data.length <= 0) {

        return (
            <div className="flex justify-center items-center h-screen text-red-400">
                History empty
            </div>
        )
    }

    console.log("purchaes", data)

    return (

        <div className='  mt-6 font-sans'>

            <div>
                <h1 className=" text-2xl font-bold mx-46 mt-2">
                    My Purchase History
                </h1>
            </div>
            <div className="flex space-x-6 my-6 flex-col justify-center content-center  h-full m-46  rounded-lg">

                {data?.data.slice(0, 5).map((wishlistItem: IWishlist, index: number) => (
                    <HistoryCard product={wishlistItem?.product} purchaseID={wishlistItem._id} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Purchase
