import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Script from "next/script";
import payment from "@/process/payment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Checkout(props) {
  const [address, setaddress] = useState({})
  const [isError, setisError] = useState(false)
  const [error, seterror] = useState("")
  const onChange = (e) => {
    setaddress({ ...address, [e.target.name]: e.target.value })

  }
  let { Cart, removefromCart, subTotal } = props;
  if(isError){  
    setisError(false)
    toast.error(error,{
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    seterror("");
  }
  return <div className="flex justify-center mt-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
    <div className="flex flex-col  max-w-7xl justify-center items-center ">
      <div className="bg-white my-4 shadow-xl min-h-96 flex flex-col justify-center text-black rounded-lg">
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-center max-w-7xl  mt-5">
            <div className="flex flex-col px-7 py-2 bg-purple-200  w-full rounded-tl-3xl">
              <div className="text-lg font-semibold">
                <h1>Delivery Address</h1>
              </div>
              <div className="flex flex-col md:flex-row ">
                <div className="">
                  <input onChange={onChange} type="text" name="fname" id="fname" placeholder="Enter first name" className="w-full border-2 border-white px-3 py-1 text-sm outline-none placeholder:text-black placeholder:opacity-40 mt-4 mr-2 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
                </div>
                <div className="">
                  <input onChange={onChange} type="text" name="lname" id="lname" placeholder="Enter last name" className="w-full md:w-[95%] border-2 border-white px-3 py-1 text-sm outline-none placeholder:text-black placeholder:opacity-40 mt-4 md:ml-2 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
                </div>
              </div>
              <input onChange={onChange} type="email" name="email" id="email" placeholder="Enter email address" className="w-full border-2 border-white text-sm outline-none px-3 py-1 placeholder:text-black placeholder:opacity-40 mt-4 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
              <input onChange={onChange} type="tel" name="mobile" id="mobile" placeholder="Phone Number" className="w-full border-2 border-white text-sm outline-none px-3 py-1 placeholder:text-black placeholder:opacity-40 mt-4 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
              <div className="flex flex-col md:flex-row ">
                <div className="">
                  <input onChange={onChange} type="number" name="pin" id="pin" placeholder="PIN Code" className="w-full border-2 border-white px-3 py-1 text-sm outline-none placeholder:text-black placeholder:opacity-40 mt-4 mr-2 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
                </div>
                <div className="">
                  <input onChange={onChange} type="text" name="city" id="city" placeholder="Enter city name" className="w-full md:w-[95%] border-2 border-white px-3 py-1 text-sm outline-none placeholder:text-black placeholder:opacity-40 mt-4 md:ml-2 focus:border-blue-500 duration-200 ease-in-out rounded-lg" />
                </div>
              </div>
              <textarea id="detail" onChange={onChange}
               name="detail" placeholder="Enter your address here" className="mb-3 w-full border-2 border-white text-sm outline-none h-50 placeholder:text-black placeholder:opacity-40 focus:border-blue-500 py-1 px-3 mt-4 resize-none leading-6 duration-200 ease-in-out rounded-lg" ></textarea>
            </div>
            <div className="flex flex-col bg-blue-900 text-white md:w-[65%] rounded-br-3xl">
              <h1 className="font-semibold text-lg px-5 my-2">Cart items</h1>
              <ol className='ml-5 list-decimal'>
                {Object.keys(Cart).map((k) => {
                  return <li key={k}>
                    <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>{Cart[k].name}</div>
                      <div className='flex items-center justify-center w-1/3 font-bold text-lg' ><AiFillMinusCircle className='cursor-pointer' onClick={() => { removefromCart(Cart[k].itemCode, 1, false) }} /><span className='mx-2'>{Cart[k].qty}</span><AiFillPlusCircle className='cursor-pointer' onClick={() => { removefromCart(Cart[k].itemCode, 1, true) }} /></div>
                    </div>
                  </li>
                })}
              </ol>
            </div>
          </div>
        </div>
        <button className="bg-blue-900 hover:bg-blue-600 py-1 px-4 font-semibold text-white w-1/2 text-center mx-auto my-3 rounded-tr-lg rounded-bl-lg" onClick={()=>{payment(subTotal,Cart,setisError,seterror)}} >Procced to Pay ₹: {subTotal}</button>
      </div>
    </div>
  </div>
}
