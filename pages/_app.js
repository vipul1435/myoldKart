import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)
  const saveCart = (myCart)=>{
      localStorage.setItem("Cart",JSON.stringify(myCart));
      let subT=0;
      let keys = Object.keys(myCart);
      for(let i=0;i<keys.length;i++){
        subT+=myCart[keys[i]].price*myCart[keys[i]].qty;
      }
      setsubTotal(subT);
  }
  useEffect(() => {
    return () => {

      try{
        if(localStorage.getItem("Cart")){
          setCart(JSON.parse(localStorage.getItem("Cart")));
        }
      } catch(e){
        localStorage.clear();
      }
      
    }
  }, [])
  
  const clearCart=()=>{
    setCart({});
    saveCart({});
  }
  const addtoCart = (itemCode,qty,price,name,size,varient)=>{
    let myCart= Cart;
    if(itemCode in Cart){
      myCart[itemCode].qty = Cart[itemCode].qty+1;
    } else{
      myCart[itemCode] = {itemCode,qty:1,price,name,size,varient}
    }
    setCart(myCart);
    saveCart(myCart);
  }
  const removefromCart=(itemCode,qty,flag)=>{
    let myCart= Cart;
    if(itemCode in Cart){
      if(flag){
        myCart[itemCode].qty = Cart[itemCode].qty+qty;
      } else {
        myCart[itemCode].qty = Cart[itemCode].qty-qty;
      }
    }
    if(myCart[itemCode]["qty"]<=0){
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  }
  return <>
  <Navbar Cart={Cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component Cart={Cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
  <Footer/>
  </>
}
