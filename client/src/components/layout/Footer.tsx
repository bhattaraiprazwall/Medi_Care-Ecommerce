// components/layout/Footer.tsx
'use client'

import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 ">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold text-white">MediCare</h2>
                    <p className="text-sm mt-2 text-gray-400">Your trusted place for medical products.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/admin/product" className="hover:text-white">Products</a></li>
                        <li><a href="/admin/add" className="hover:text-white">Add Product</a></li>
                        <li><a href="/admin/orders" className="hover:text-white">Orders</a></li>
                        <li><a href="/admin/users" className="hover:text-white">Users</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-gray-400">Email: support@medicare.com</p>
                    <p className="text-sm text-gray-400">Phone: +977-9800000000</p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaGithub /></a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10">
                © {new Date().getFullYear()} MediCare. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
