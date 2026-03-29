'use client'

import React from 'react'
import Header from './header'
import HeroSection from './heroSection'
import SecondPage from './secondPage'
import SupplementOfferPage from './ThirdPage'
import FourthPage from './FourthPage'
import Fifth from './Fifth'
import Footer from '../layout/Footer'

function Home() {


    return (

        <div >
            <Header />
            <HeroSection />

            <SecondPage />

            <SupplementOfferPage /> 

            <FourthPage />

            <Fifth />

            <Footer />
        </div >
    )
}

export default Home