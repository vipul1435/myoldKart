const payment = async (subTotal,Cart,setisError,seterror) => {
    let data = { subTotal: subTotal, Cart: Cart };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createorder`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let order  = await res.json();
    if(!order.success){

        seterror(order.error)
        setisError(true)
        return
    }
    order= order.order
    let temp = {email:"temp@gmail.com",products:Cart,address:"fgjddfgjdgjfgjjh",amount:subTotal,orderId:order.id}
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/saveorder`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    })
    const key_id = process.env.NEXT_PUBLIC_KEY_ID;
    const options = {
        key: key_id,
        amount: order.amount,
        currency: "INR",
        name: "myoldKart",
        description: "Test Transaction",
        image: "https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SX522_.jpg",
        order_id: order.id,
        callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/orderverification`,
        prefil: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open()
}

export default payment