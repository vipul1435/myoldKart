import Link from 'next/link'
import React from 'react'
export default function Login() {
  return <div className="flex my-10 py-5 justify-center">
    <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[100%]  m-2">
      <div className=" w-full md:w-3/2">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">

          <h1 className="font-semibold mt-10 text-xl md:text-5xl text-gray-600 m-2">Forgot Password</h1>

        </div>
        <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
          <div className="">
            <input type="email" placeholder="Email"
              className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"/>
          </div>
        </div>
        <div className="text-center mb-10 mt-7">
          <button
            className={`px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2`}>Continue</button>
        </div>
      </div>
      <div
        className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">

        <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
          <h1 className=" my-5 text-5xl ">Continue to Log In</h1>
          <h1 className=" my-5">Log In and get exciting offers</h1>
         <Link href={"/login"}> <button className="bg-white rounded-2xl px-4  my-5 text-emerald-400 hover:translate-x-1 py-1">Log In</button></Link>
        </div>

      </div>

    </div>
  </div>
}
