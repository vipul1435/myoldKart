import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row py-2 shadow-md'>
            <div className='logo flex self-center mx-5'>
                <Link href="/">
                    <Image width={200} height={40} src="/logo1.png" alt="logo" />
                </Link>
            </div>
            <div className='nav flex items-center justify-center'>
                <ul className='flex flex-col items-center min-[400px]:flex-row space-x-2 font-bold md:text-emerald-900 mx-2 my-2'>
                    <Link href={'/tshirts'}><li>Tshirts</li></Link>
                    <Link href={'/hoodies'}><li>Hoodies</li></Link>
                    <Link href={'/books'}><li>Books</li></Link>
                    <Link href={'/contact'}><li>Contact Us</li></Link>
                </ul>
            </div>
            <div className='cart flex justify-center min-[300px]:absolute right-2 top-4 mx-5'>
                <AiOutlineShoppingCart className='text-xl md:text-3xl' />
            </div>
        </div>
    )
}

export default Navbar