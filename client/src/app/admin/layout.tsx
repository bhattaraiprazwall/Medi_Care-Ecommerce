'use client'

import { ReactNode } from "react"
import { WithAuth } from "../../components/auth/withAuth"
import AdminPanelNavbar from "@/components/layout/AdminPanelNavbar"

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            <AdminPanelNavbar />
            {children}
        </>

    )
}

export default WithAuth(Layout, ["Admin"])