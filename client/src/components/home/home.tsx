import React from 'react'
import TopStock from './topstock/TopStock'
import FeaturedStock from './featured/featured'
import ProductGrid from './products/allproducts'

function HomePage() {
    return (
        <main>

            <TopStock />
            <FeaturedStock />
            <ProductGrid />
        </main>
    )
}

export default HomePage