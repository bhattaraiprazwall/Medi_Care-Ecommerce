'use client'

import NavBar from '@/components/layout/navbar'
import React, { ReactNode } from 'react'
import { WithAuth } from '../../components/auth/withAuth'
import Footer from '@/components/layout/Footer'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex flex-col flex-grow ">
                <div className="flex-grow  min-h-screen">
                    {children}
                </div>

                <Footer />
            </main>
        </div>
    )
}

export default WithAuth(Layout, ["Admin", "User"])
