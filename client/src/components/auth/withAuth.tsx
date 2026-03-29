'use client'

import { ComponentType, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Parsetoken } from '@/util/parseToken'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function WithAuth<P extends { children?: ReactNode }>(
    Component: ComponentType<P>,
    allowedRoles: string[]
) {
    return function WithAuthWrapper(props: P) {
        const router = useRouter()
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

        useEffect(() => {
            if (typeof window === 'undefined') return

            const token = Cookies.get('access_token')
            const { valid, role } = Parsetoken(token || '')

            if (!valid || !allowedRoles.includes(role || '')) {
                Cookies.remove('access_token')
                localStorage.removeItem('user_info')
                router.push('/auth/login')
                toast.error('Unauthorized Please login')
            } else {
                setIsAuthorized(true)
            }
        }, [router])

        if (isAuthorized === null) return null
        if (!isAuthorized) return null

        return <Component {...props} />
    }
}