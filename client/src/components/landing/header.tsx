'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { SiSuno } from 'react-icons/si'
import { Parsetoken } from '@/util/parseToken'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

function Header() {
    const router = useRouter()
    const [token, setToken] = useState<string | undefined>(undefined)
    const [role, setRole] = useState<string | undefined>(undefined)
    const [valid, setValid] = useState<boolean>(false)

    useEffect(() => {
        // This runs only on the client side
        const token = Cookies.get("access_token")
        const { valid, role } = Parsetoken(token ?? '')
        setToken(token)
        setValid(valid)
        setRole(role)
    }, [])

    function login() {
        router.push('/auth/login')
    }

    function cart() {
        router.push(`/home/cart`)
    }

    function wishlist() {
        router.push(`/home/wishlist`)
    }

    return (
        <div className='lg:p-4 flex justify-between items-center font-sans lg:mx-2 m-2'>
            <div className='flex items-center'>
                <SiSuno size={25} />
                <label className='p-2 font-semibold cursor-pointer text-2xl'>
                    Life Harmony
                </label>
            </div>

            <div className='flex lg:px-7 justify-between items-center'>
                <div className='flex mx-9 space-x-4 items-center-safe'>
                    <FaHeart size={37} className='text-black bg-gray-100 p-2 rounded-full cursor-pointer' onClick={wishlist} />
                    <IoMdCart size={35} className='bg-black text-white rounded-full p-2 cursor-pointer' onClick={cart} />
                </div>

                {valid ? (role === 'Admin' ? (
                    <div className='flex content-center items-center-safe space-x-6'>
                        <button className='bg-black text-white px-3 py-2 rounded-3xl cursor-pointer' onClick={() => router.push('/admin/product')}>
                            Admin
                        </button>
                        <LogOut className='cursor-pointer'
                            onClick={() => {
                                Cookies.remove('access_token')
                                router.push('/auth/login')
                                toast.success("log out")
                            }} />
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <button className='bg-black text-white px-3 py-2 rounded-3xl cursor-pointer' onClick={() => router.push('/home')}>
                            Home
                        </button>
                        <button className='bg-black text-white px-3 py-2 rounded-3xl cursor-pointer' onClick={() => {
                            Cookies.remove('access_token')
                            router.push('/auth/login')
                            toast.success("log out")
                        }}>
                            Logout
                        </button>
                    </div>
                )) : (
                    <button className='bg-black text-white px-3 py-2 rounded-3xl cursor-pointer' onClick={login}>
                        Login
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header