'use client'

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface TokenPayload {
    exp?: number
    role?: string
    [key: string]: any
}

interface ParseTokenResult {
    valid: boolean
    role?: string
}

export function Parsetoken(token: string): ParseTokenResult {
    // Early return if no token provided
    if (!token) {
        return { valid: false }
    }

    try {
        // Client-side check
        if (typeof window === 'undefined') {
            return { valid: false }
        }

        const decoded: TokenPayload = jwtDecode(token)
        const now = Math.floor(Date.now() / 1000)

        // Check token expiration
        if (decoded?.exp && now > decoded.exp) {
            // Clean up invalid token
            Cookies.remove("access_token")
            localStorage.removeItem('user_info')
            return { valid: false }
        }

        return {
            valid: true,
            role: decoded?.role
        }

    } catch (error) {
        console.error("Error parsing token:", error)
        // Clean up on error
        Cookies.remove('access_token')
        localStorage.removeItem('user_info')
        return { valid: false }
    }
}