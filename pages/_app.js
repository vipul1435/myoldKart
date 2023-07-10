import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [Cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)
  const [user, setuser] = useState({ value: null })
  const [key, setkey] = useState(0)
  const router = useRouter();
  const saveCart = (myCart) => {
    localStorage.setItem("Cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubTotal(subT);
  }
  useEffect(() => {
    return () => {
      router.events.on('routeChangeComplete', () => {
        setProgress(100)
      })
      try {
        if (localStorage.getItem("Cart")) {
          setCart(JSON.parse(localStorage.getItem("Cart")));
          saveCart(JSON.parse(localStorage.getItem("Cart")));
        }
        let token = localStorage.getItem('token');
        if (token) {
          setuser({ value: token });
          setkey(Math.random());
        }
      } catch (e) {
        localStorage.clear();
      }
    }
  }, [router.query])

  const buyNow = (itemCode, qty, price, name, size, varient) => {
    let newCart = {};
    newCart[itemCode] = { itemCode, qty: 1, price, name, size, varient }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  const clearCart = () => {
    setCart({});
    saveCart({});
  }
  const addtoCart = (itemCode, qty, price, name, size, varient) => {
    let myCart = Cart;
    if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty + 1;
    } else {
      myCart[itemCode] = { itemCode, qty: 1, price, name, size, varient }
    }
    setCart(myCart);
    saveCart(myCart);
  }
  const removefromCart = (itemCode, qty, flag) => {
    let myCart = Cart;
    if (itemCode in Cart) {
      if (flag) {
        myCart[itemCode].qty = Cart[itemCode].qty + qty;
      } else {
        myCart[itemCode].qty = Cart[itemCode].qty - qty;
      }
      if (myCart[itemCode].qty <= 0) {
        delete myCart[itemCode];
      }
    }
    setCart(myCart);
    saveCart(myCart);
  }

  return <>
    <LoadingBar
      color='purple'
      waitingTime={100}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar setuser={setuser} key={key} setkey={setkey} user={user} Cart={Cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component buyNow={buyNow} Cart={Cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
    <Footer />
  </>
}