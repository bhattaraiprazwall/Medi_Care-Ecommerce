import Image from 'next/image'
import React from 'react'

function Fifth() {
    return (
        <main className='px-6 mt-36'>

            <h1 className='font-semibold text-gray-600 text-4xl py-6'>OUR BLOG    </h1>



            <div className='flex  m-6 grow shrink flex-1 '>
                <div className='justify-start w-1/3'>
                    <Image
                        src="/img1.png"
                        alt="Organic Collagen Peptides"
                        width={260}
                        height={240}
                        className="rounded-xl shadow-md rotate-6 p-3"
                    />
                    <p className='my-16'>
                        Every month we show you the
                        <br />

                        best-selling products in our store
                        <br />

                        so you can stay up to date with
                        <br />
                        trends.
                    </p>
                </div>

                <div className=" items-center  w-1/3">
                    <Image
                        src="/img2.png"
                        alt="Organic Collagen Peptides"
                        width={450}
                        height={440}
                        className=""
                    />
                </div>


                <div className=' w-1/3 px-16'>
                    <Image
                        src="/img3.png"
                        alt="Organic Collagen Peptides"
                        width={280}
                        height={240}
                        className="rounded-xl shadow-md rotate-6 p-3"
                    />

                    <div className='flex flex-col py-6 '>

                        <span className='font-semibold'>
                            Welcome to the Life
                            <br />
                            Harmony Wellness Blog
                        </span>


                        <span>

                            Stay Informed, stay healthy! Our Life
                            <br />
                            Harmony Blog is your go-to source
                            <br />
                            for expert insights on nutrition.
                            <br />
                            wellness, and the power of vitamins
                            <br />
                            & supplements.

                        </span>

                    </div>

                </div>
            </div>
        </main>
    )
}

export default Fifth