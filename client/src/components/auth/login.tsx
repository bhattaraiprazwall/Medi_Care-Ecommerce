"use client"

import Link from 'next/link';
import Input from '../common/input/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schema/auth.schema';
import { ILogin } from '@/interface/auth.interface';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login } from '@/api/auth.api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

function LoginForm() {
    const router = useRouter();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
        mode: 'onSubmit',
    });

    const { isPending, mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (response) => {
            toast.success(response?.message);

            // Safely set cookies & localStorage (optional check)
            if (typeof window !== 'undefined') {
                Cookies.set('access_token', response?.token);
                localStorage.setItem('user_info', JSON.stringify(response?.data));
            }

            // Redirect based on role
            if (response?.data?.role === "Admin") {
                router.replace('/admin/product');
            } else {
                router.replace('/home');
            }

            reset();
        },
        onError: (error: any) => {
            toast.error(error?.message || "Login failed");
        }
    });

    function onSubmit(data: ILogin) {
        mutate(data);
    }

    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <div className="flex w-[999px] max-w-[1000px] h-[650px] rounded-lg shadow-lg shadow-gray-300 overflow-hidden tracking-wider">
                {/* Left section (placeholder for illustration) */}
                <div className='flex-1 border-r-2 border-gray-500 w-full relative'>

                    <Image
                        alt='auth.jpeg'
                        fill
                        className='object-cover'
                        src={'/auth.webp'} />

                </div>

                {/* Right section (form) */}
                <div className='flex flex-col flex-1 w-1/2 justify-center items-center h-full relative'>
                    <div className='flex justify-between items-center h-full flex-col w-full'>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 flex flex-col text-center justify-center h-full'>
                            <Input
                                required
                                label='Email'
                                name='email'
                                register={register}
                                error={errors?.email?.message}
                                placeholder='Email'
                                type='email'
                            />
                            <Input
                                required
                                label='Password'
                                name='password'
                                register={register}
                                error={errors?.password?.message}
                                placeholder='Password'
                                type='password'
                            />
                            <button
                                className='border-2 border-gray-600 p-2 rounded-xl cursor-pointer bg-black text-white'
                                disabled={isPending}
                            >
                                {isPending ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        {/* Signup section */}
                        <div className='flex space-x-2.5 pb-4'>
                            <label className='text-sm text-gray-400'>
                                Don&apos;t have an account yet?
                            </label>
                            <Link href="/auth/signup" className='text-blue-800 font-medium text-sm cursor-pointer'>
                                Sign Up
                            </Link>
                            <Link href="/" className='text-blue-800 font-medium text-sm cursor-pointer'>
                                Back to page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginForm;