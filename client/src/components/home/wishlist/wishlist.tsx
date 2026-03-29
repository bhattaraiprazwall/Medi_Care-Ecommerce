'use client'

import { wishList } from "@/api/wishlist.api"
import WishlistCard from "@/components/common/cards/wishlistCard"
import { IWishlist } from "@/interface/wishlist.interface"
import { useQuery } from "@tanstack/react-query"


const Wishlist = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['get-all-wishlist-products'],
        queryFn: wishList,

    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading wishlist...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Failed to load wishlist.</div>
    }

    if (data?.data.length <= 0) {

        return (
            <div className="flex justify-center items-center h-screen text-red-400">
                Wishlist empty
            </div>
        )
    }

    return (

        <div className='  mt-6 font-sans'>

            <div>
                <h1 className=" text-2xl font-bold mx-46 mt-2">
                    My Wishlist
                </h1>
            </div>
            <div className="flex space-x-6 my-6 flex-col justify-center content-center  h-full m-46  rounded-lg">

                {data?.data.slice(0, 5).map((wishlistItem: IWishlist, index: number) => (
                    <WishlistCard product={wishlistItem?.product} wishlistID={wishlistItem._id} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist
