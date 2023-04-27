import React, { useState } from 'react'

export default function Checkdelivery() {
    const [available, setavailable] = useState();
    const [pin, setpin] = useState();
    const [checked_pin, setchecked_pin] = useState()
    const onchangePin=(e)=>{
        setpin(e.target.value);
    }
    const checkAvailability = async() =>{
        const pins = await fetch('http://localhost:3000/api/pincode');
        const pinval= await pins.json();
        if(pinval.includes(parseInt(pin))){
            setavailable(true);
        } else {
            setavailable(false);
        }
        setchecked_pin(pin);
    }
  return (
    <div className=' my-3 py-2 flex flex-col'>
        <div className='font-bold text-lg my-1'>Check delivery availability</div>
        <div className='flax flex-col space-x-3  text-md '>
            <input className='border-2 px-2 rounded-lg border-violet-600' type="number" onChange={onchangePin}/>
            <button className='items-center ml-7 my-2 text-white bg-violet-500 border-0 py-1 px-4 focus:outline-none hover:bg-violet-600 rounded' onClick={checkAvailability}>Check</button>
        </div>
        {(available && available!=null) && <div className='text-sm italic text-green-600 '>YEH! We are delivering to pincode: {checked_pin}</div>}
        {(!available && available!=null) && <div className='text-sm italic text-red-600'>SORRY! We are not delivering to pincode: {checked_pin}</div>}
    </div>
  )
}
