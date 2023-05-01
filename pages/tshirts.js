import Product from '@/modals/Product'
import mongoose from 'mongoose'
import Link from 'next/link'
import React from 'react'
export default function Tshirts({products}) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly">
            {products.map((item)=>{
              return <Link key={item._id} href={`/product/${item.slug}`} className="lg:w-1/5 md:w-1/2.5 p-5 rounded-md m-2 w-full shadow-xl">
              <img alt="ecommerce" className="p-5 m-auto block relative mix-blend-multiply rounded overflow-hidden" src={item.image} />
              <div className="mt-4 text-center">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-SHIRTS</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                <p className="mt-1">₹ {item.price}</p>
              </div>
            </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products =await Product.find({category:'tshirts'})
  return {
    props: {products: JSON.parse(JSON.stringify(products))}
  }
}