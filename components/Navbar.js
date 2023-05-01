import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle,AiFillMinusCircle,AiFillPlusCircle } from 'react-icons/ai';
import {HiShoppingCart} from 'react-icons/hi'
import {FaUserCircle} from 'react-icons/fa'
const Navbar = (props) => {
    const {Cart,addtoCart,removefromCart,clearCart,subTotal}=props;
    const togggleCart = () =>{
        if(ref.current.classList.contains('hidden')){
          ref.current.classList.remove('hidden')
        } else {
          ref.current.classList.add('hidden')
        }
      }
    const ref= useRef();
    return (
        <div className='flex sticky top-0 z-10 bg-white flex-col md:flex-row py-2 shadow-md'>
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
                <AiOutlineShoppingCart className='text-xl md:text-3xl' onClick={togggleCart}/>
                <Link href={'/login'}><FaUserCircle className='text-xl ml-5 md:text-3xl'/></Link>
            </div>
            <div ref={ref} className="sidebar z-10 transform hidden transition-transform ml-2 p-2 mb-3 fixed  sm:w-1/2 lg:w-1/3 top-1 h-[98vh] right-1 bg-gradient-to-br from-[#F6FA41] to-[#F048C6] shadow-lg shadow-cyan-500/50   rounded-xl  border-2 border-amber-600 border-solid">
                <h2 className='text-center font-bold text-2xl my-2 text-black'>Shopping Cart</h2>
                <span className='absolute top-2 right-2 text-2xl'><AiFillCloseCircle onClick={togggleCart}/></span>
                {Object.keys(Cart).length==0 && <div className='font-bold text-center italic'>Your Cart is Empty</div> }
                <ol className='ml-4 list-decimal mix-blend-darken'>
                    {Object.keys(Cart).map((k)=>{
                        return <li key={k}>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-bold'>{Cart[k].name}</div>
                            <div className='flex items-center justify-center w-1/3 font-bold text-lg' ><AiFillMinusCircle className='cursor-pointer' onClick={()=>{removefromCart(Cart[k].itemCode,1,false)}} /><span className='mx-2'>{Cart[k].qty}</span><AiFillPlusCircle className='cursor-pointer' onClick={()=>{removefromCart(Cart[k].itemCode,1,true)}} /></div>
                        </div>
                    </li>
                    })}
                </ol>
                {Object.keys(Cart).length!=0 && <div className='font-bold text-center italic'>SubTotal: {subTotal}</div> }
                <div className='flex justify-center'>
                    <Link href={'/checkout'}><button onClick={togggleCart} className="text-black rounded-full item flex text-center bg-yellow-300 border-0 py-2 px-2 focus:outline-none hover:-translate-y-1 shadow-2xl text-md mr-4"><HiShoppingCart className='m-1' /> Checkout</button></Link>
                    <button className="text-black item flex text-center bg-pink-400 border-0 py-2 px-2 focus:outline-none hover:-translate-y-1 shadow-2xl rounded-full text-md mr-4" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar