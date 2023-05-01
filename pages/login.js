import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [is_login, setis_login] = useState(true)
  const router = useRouter()
  const toggle = () => {
    setis_login(!is_login)
  }

  const [credential, setcredential] = useState({});
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handelAuthenticate = async (e) => {
    e.preventDefault();
    onChange;
    if (is_login) {
      let body = { email: credential.email, password: credential.password };
      let res = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let response = await res.json();
      if (response.success) {
        localStorage.setItem('token', response.token)
        toast.success('Logged in Successfully', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push('/')
        }, [1000]);
      } else {
        toast.error(response.error, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      let body = { name: credential.name, email: credential.email, password: credential.password };
      let res = await fetch('http://localhost:3000/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let response = await res.json();
      if (response.success) {
        localStorage.setItem('token', response.token)
        toast.success('Sing up Successfully', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push('/')
        }, [1000]);
      } else {
        toast.error(response.error, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return <div className="flex my-10 py-5 justify-center">
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[100%]  m-2">
      <div className=" w-full md:w-3/2">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
          <h1 className="font-semibold mt-10 text-xl md:text-5xl text-gray-600 m-2">{is_login ? "Login to your account" : "Register Here"}</h1>
        </div>
        <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
          {!is_login && <div className="">
            <input onChange={onChange} type="text" placeholder="User Name" name='name'
              className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" />
          </div>}
          <div className="">
            <input onChange={onChange} type="email" placeholder="Email" name='email'
              className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" />
          </div>
          <div className="">
            <input onChange={onChange} type="password" placeholder="Password" name='password'
              className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" />
          </div>
        </div>
        <div className="text-center mt-7">
          <button onClick={handelAuthenticate}
            className={`px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 ${is_login ? "mb-0" : "mb-10"}`}>{is_login ? "Log In" : "Sign In"}</button>
          {is_login && <Link href={"/forgot"}><h1 className="text-sm font-medium text-gray-600 mt-5 mb-10 m-2">Forgot Password</h1></Link>}
        </div>
      </div>
      <div
        className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">
        <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
          <h1 className="text-5xl my-5">{is_login ? "New Here?" : "Already Registered"}</h1>
          <h1 className="my-5">{!is_login ? "Log In" : "Sign In"} and get exciting offers</h1>
          <button className="bg-white rounded-2xl px-4 my-5 text-emerald-400 hover:translate-x-1 py-1" onClick={toggle}>{!is_login ? "Log In" : "Sign In"}</button>
        </div>

      </div>

    </div>
  </div>
}
