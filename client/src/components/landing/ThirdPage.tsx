'use client'

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SupplementOfferPage() {

    const router = useRouter();

    return (
        <div className="min-h-screen  flex items-center justify-center flex-col">

            <div>

                <h1 className='text-6xl font-bold '>NEW ARRIVALS</h1>
            </div>

            <div className="bg-white max-w-6xl w-full rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
                {/* Left Panel */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-2">A set of Dietary supplements</h2>
                    <p className="text-gray-600 mb-4">Vitamin D3+K2 + Organic Collagen Peptides</p>
                    <div className="flex items-center space-x-3 mb-6">
                        <p className="line-through text-gray-400 text-xl">$45.99</p>
                        <p className="text-3xl font-bold text-gray-800">$38.99</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-black text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all cursor-pointer"
                            onClick={() => {
                                router.push('/home/')
                            }} >
                            Add to cart
                        </button>
                        <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-xl hover:bg-gray-100">
                            ♥
                        </button>
                    </div>
                </div>

                {/* Center Image */}
                <div className="md:w-1/2 relative flex items-center justify-center ">
                    <div className="absolute top-4 text-5xl font-bold text-gray-300 opacity-30">
                        GREAT OFFER · GREAT OFFER · GREAT OFFER
                    </div>
                    <div className="relative z-10 flex items-center justify-center gap-6 py-10">
                        <Image
                            src="/med.png"
                            alt="Vitamin D3+K2"
                            width={180}
                            height={240}
                            className="rounded-xl shadow-md p-4"
                        />
                        <Image
                            src="/med.png"
                            alt="Organic Collagen Peptides"
                            width={180}
                            height={240}
                            className="rounded-xl shadow-md rotate-6 p-3"
                        />
                    </div>
                </div>

                {/* Right Text Info */}
                <div className="md:w-1/3 p-6 text-sm text-gray-600 flex flex-col justify-center">
                    <p className="mb-4">
                        Whether you&apos;re an athlete, a busy professional, or just looking to boost
                        your overall health, we have the perfect set for you.
                    </p>
                    <p className="mb-4">
                        Buying a set of supplements is profitable and convenient!
                    </p>
                    <a href="/home" className="text-black underline font-medium">
                        View all sets
                    </a>
                </div>
            </div>
        </div>
    );
}
