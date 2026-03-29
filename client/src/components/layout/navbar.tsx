import { Home, LogOut, Search, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { FaHeart } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { SiSuno } from 'react-icons/si'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

function NavBar() {

    const navbarItems = [
        {
            label: 'Home',
            icon: <Home />,
            link: '/home'
        },
        {
            label: 'Whistlist',
            icon: <FaHeart size={20} />,
            link: '/home/wishlist'

        },
        {
            label: 'My Cart',
            icon: <IoMdCart size={23} />,
            link: '/home/cart'
        },
        {
            label: 'Purchase',
            icon: <BiPurchaseTag size={24} />,
            link: '/home/purchase'

        },

    ]

    const user = [
        {
            icon: <User />
        },
    ]

    const router = useRouter()
    function onLanding() {

        router.replace('/')

    }

    return (
        <div className='flex -6 w-full justify-between p-6  border-gray-200 shadow-lg rounded-lg '>

            <div className='flex items-center' onClick={onLanding}>
                <SiSuno size={25} />
                <label className='p-2 font-semibold cursor-pointer text-2xl'>
                    Life Harmony
                </label>
            </div>




            <div className='flex space-x-7  border-gray-200 rounded-4xl  px-6 content-center ml-56'>

                {
                    navbarItems.map((items, index) => (
                        <Link href={`${items.link}`} key={index}>
                            <div className='flex items-center space-x-2  h-full rounded-4xl p-2 cursor-pointer '>
                                {items.icon}
                                <h1 className='font-sans font-semibold'>{items.label}</h1>

                            </div>
                        </Link>)
                    )
                }


            </div>
            <div className='flex space-x-7  border-gray-200 rounded-4xl   content-center justify-center text-center items-center'>


                <input type='text' className='border border-gray-200 broder-2 p-2 rounded-4xl' placeholder='Search...' />
                <Search className='mr-2' />

                <div className='flex space-x-7  border-gray-200 rounded-4xl  px-6 justify-end items-end '>

                    {
                        user.map((items, index) =>
                            <div className='flex items-center space-x-2  h-full rounded-4xl p-2 cursor-pointer' key={index}>
                                {items.icon}
                                <LogOut className='cursor-pointer'
                                    onClick={() => {
                                        Cookies.remove('access_token')
                                        router.push('/auth/login')
                                        toast.success("log out")
                                    }} />


                            </div>)
                    }


                </div>
            </div>






        </div>
    )
}

export default NavBar