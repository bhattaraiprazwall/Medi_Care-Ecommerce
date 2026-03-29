'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

function HeroSection() {

    const router = useRouter();

    function home() {

        router.push(`/home`)
    }

    return (
        // {/* // center */}
        <div className='mx-2 mb-7 p-10'>

            <div className='w-full flex  my-9 items-center font-sans lg:mx-2'>

                <p className=' lg:text-8xl lg:font-sans lg:font-medium text-3xl font-sans font-bold w-full'>HEALTHCARE. REAL RESUTLS</p>
            </div>

            {/* decriptionSection */}

            <div className='lg:flex lg:font-sans lg:space-x-6 lg:content-between'>

                <div className="lg:w-1/3 lg:py-6 lg:px-6">
                    <label className='lg:text-2xl lg:font-medium lg:tracking-tight '>Take the step towards <br />a healthier, more <br />vibrant life-shop now <br />and fuel your body with <br />the best!</label>

                    <div className='flex flex-col '>

                        <p className='my-9'>Learn more</p>
                        <hr className='w-fit'></hr>
                        <button className='w-[144px] border text-white bg-black rounded-4xl flex p-2 items-center justify-center space-x-9 cursor-pointer ' onClick={home}>Shop
                            <FaArrowRightLong className='bg-white text-black mx-2 rounded-full p-1' size={20} />
                        </button>
                    </div>
                </div>

                {/* images section */}

                <div className="lg:w-1/3 lg:p-6 lg:flex lg:justify-center lg:h-[450px] items-center flex justify-center mt-6">
                    {/* Left container with Premium text at the bottom */}
                    <div className="lg:flex lg:flex-col lg:justify-end lg:h-full lg:pb-9 lg:px-9 mr-1">
                        <p className="lg:bg-white lg:rounded-4xl lg:px-4 lg:w-[200px] lg:text-end lg:border-gray-200 lg:border-2 border-2 border-gray-200 rounded-full text-center">
                            Premium Ingredients
                        </p>
                    </div>

                    {/* Image */}
                    <Image
                        src="/med.png"
                        width={250}
                        height={180}
                        alt="Picture of the author"
                    />

                    {/* Right container with two tags */}
                    <div className="lg:px-12 lg:text-center lg:flex lg:flex-col lg:justify-between lg:h-full lg:py-6">
                        <p className="lg:w-[150px] lg:bg-white lg:rounded-4xl lg:border-gray-200 lg:border-2 ml-3 border-2 text-center border-gray-100 rounded-full px-1">Allergen-Free</p>
                        <p className="lg:bg-white lg:rounded-4xl lg:mt-[200px] lg:border-gray-200 lg:border-2 ml-3 border-2  border-gray-100 rounded-full mt-6 py-1 pl-1">Non-GMO</p>
                    </div>
                </div>

                <div className="lg:flex lg:w-1/3 lg:flex-col lg:items-start lg:pl-40 ">
                    <p className="lg:w-[244px] lg:text-left lg:font-medium lg:text-md pt-2 pl-6">
                        Our products are carefully formulated with science-backed ingredients, free from artificial additives, and made to the highest standards.
                    </p>

                    <Image
                        src="/cap's.png"
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        className="bg-white rounded-[460px] mt-36"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection