"use client"

import Link from 'next/link';
import Input from '../common/input/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/schema/auth.schema';
import { ISignup } from '@/interface/auth.interface';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth.api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


function Signup() {

    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, reset } = useForm({

        defaultValues: {
            email: '',
            userName: '',
            password: '',
            phoneNumber: '',
        },
        resolver: yupResolver(signupSchema),
        mode: 'all'
    })



    const { isPending, mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: signup,
        onSuccess: (response) => {

            toast.success(response?.message)

            router.replace('/auth/login')
            reset()

        },
        onError: (error) => {

            toast.error(error?.message || "Signup failed")
        }

    })

    function onsubmit(data: ISignup) {
        console.log(data)
        mutate(data)
    }

    return (

        <main className=' flex justify-center items-center h-screen w-screen'>
            <div className="flex w-[999px] max-w-[1000px] h-[650px] rounded-lg shadow-lg shadow-gray-300 overflow-hidden tracking-wider ">


                {/*Left section */}



                <div className='flex flex-col flex-1 w-1/2 justify-center items-center h-full relative'>

                    <div className='flex justify-between items-center h-full flex-col     w-full'>

                        <form onSubmit={handleSubmit(onsubmit)} className='space-y-2 flex flex-col text-center justify-center h-full'>

                            <Input required={true} label='Email' name='email' register={register} error={errors?.email?.message} placeholder='Email' />
                            <Input required={true} label='Username' name='userName' register={register} error={errors?.userName?.message} placeholder='Username' />
                            <Input required={true} label='Password' name='password' register={register} error={errors?.password?.message} placeholder='Password' />
                            <Input required={true} label='Phone Number' name='phoneNumber' register={register} error={errors?.phoneNumber?.message} type='text' placeholder='Phone number' />



                            <button className=' border-2 border-gray-600 p-2 rounded-xl cursor-pointer bg-black text-white' disabled={isPending}>Sign up</button>
                        </form>

                        {/* signup section */}
                        <div className='flex  space-x-2.5 pb-4'>

                            <label className='text-sm text-gray-400'>
                                Don&apos;t have an account yet?

                            </label>
                            <Link href={'/auth/login'}>
                                <p className='text-blue-800 text-bold text-sm cursor-pointer'>
                                    Login
                                </p>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Right section */}



                <div className='flex-1   border-l-2 border-gray-500 relative w-full'>

                    <Image
                        alt='auth.jpeg'
                        src={'/auth.webp'}
                        className=' object-cover'
                        fill />
                </div>


            </div>
        </main>
    )
}

export default Signup