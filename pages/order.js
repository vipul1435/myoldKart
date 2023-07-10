import mongoose from 'mongoose'
import React from 'react'
import Order from '@/modals/Order'
export default function myOrder({ order }) {
  let products = order.products
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">myoldKart.com</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id: {order.orderId}</h1>
            <div className='text-green-500 font-semibold'>*Your order has been placed successfully.</div>
            <div className='text-violet-500 font-semibold'>*Your order is ready for dispatch.</div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className='border-b-2 text-left px-2 border-violet-500 py-2 text-md'>Description</th>
                  <th className='border-b-2 text-left px-2 border-violet-500 py-2 text-md'>Quantity</th>
                  <th className='border-b-2 text-left px-2 border-violet-500 py-2 text-md'>Total</th>
                </tr>
              </thead>
              <tbody>
                {
              Object.keys(products).map((key) => {
                return <tr key={key} className="border-t border-gray-200">
                  <td className="text-gray-500 py-2 mx-2">{products[key].name}({products[key].size}/{products[key].varient})</td>
                  <td className="text-center text-gray-500 py-2 mx-2">{products[key].qty}</td>
                  <td className="text-right text-gray-900 py-2 mx-2">{products[key].price}</td>
                </tr>
              })
            }
              </tbody>
            </table>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/full_logo.png" />
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id)
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}